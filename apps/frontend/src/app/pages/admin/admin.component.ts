import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    inject,
    signal,
} from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AdminApiService } from '../../core/admin/admin-api.service';
import type {
    AdminAbout,
    AdminBenefit,
    AdminDirection,
    AdminDirectionItem,
    AdminFact,
    AdminReview,
} from '../../core/admin/admin.models';
import { AuthService } from '../../core/auth/auth.service';
import { IconPickerComponent } from '../../shared/components/icon-picker/icon-picker.component';

type AdminSection = 'about' | 'benefits' | 'directions' | 'reviews';

const ICON_OPTIONS = [
    'target',
    'book',
    'document',
    'heart',
    'math',
    'code',
    'user',
    'calendar',
    'file',
    'star',
    'quote',
] as const;

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [ReactiveFormsModule, IconPickerComponent],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
    private readonly api = inject(AdminApiService);
    private readonly authService = inject(AuthService);
    private readonly formBuilder = inject(FormBuilder).nonNullable;

    protected readonly sections: ReadonlyArray<{
        id: AdminSection;
        label: string;
    }> = [
        { id: 'about', label: 'Обо мне' },
        { id: 'benefits', label: 'Преимущества' },
        { id: 'directions', label: 'Направления' },
        { id: 'reviews', label: 'Отзывы' },
    ];
    protected readonly iconOptions = ICON_OPTIONS;
    protected readonly activeSection = signal<AdminSection>('about');
    protected readonly isLoading = signal(true);
    protected readonly successMessage = signal('');
    protected readonly errorMessage = signal('');
    protected readonly benefits = signal<AdminBenefit[]>([]);
    protected readonly directions = signal<AdminDirection[]>([]);
    protected readonly reviews = signal<AdminReview[]>([]);
    protected readonly editingBenefitId = signal<string | null>(null);
    protected readonly editingDirectionId = signal<string | null>(null);
    protected readonly editingReviewId = signal<string | null>(null);

    protected readonly aboutForm = this.formBuilder.group({
        title: ['', Validators.required],
        text: ['', Validators.required],
        facts: this.formBuilder.array([this.createFactForm()]),
    });
    protected readonly benefitForm = this.formBuilder.group({
        icon: ['target', Validators.required],
        title: ['', Validators.required],
        text: ['', Validators.required],
        order: [1, Validators.required],
        isActive: [true],
    });
    protected readonly directionForm = this.formBuilder.group({
        icon: ['math', Validators.required],
        title: ['', Validators.required],
        order: [1, Validators.required],
        isActive: [true],
        items: this.formBuilder.array([this.createDirectionItemForm()]),
    });
    protected readonly reviewForm = this.formBuilder.group({
        icon: ['quote', Validators.required],
        text: ['', Validators.required],
        studentName: ['', Validators.required],
        studentClass: ['', Validators.required],
        imageUrl: [''],
        order: [1, Validators.required],
        isActive: [true],
    });

    protected get aboutFacts(): FormArray {
        return this.aboutForm.controls.facts;
    }

    protected get directionItems(): FormArray {
        return this.directionForm.controls.items;
    }

    public ngOnInit(): void {
        this.loadContent();
    }

    protected setSection(section: AdminSection): void {
        this.activeSection.set(section);
        this.clearMessages();
    }

    protected logout(): void {
        this.authService.logout();
    }

    protected addFact(): void {
        this.aboutFacts.push(this.createFactForm());
    }

    protected removeFact(index: number): void {
        if (this.aboutFacts.length > 1) {
            this.aboutFacts.removeAt(index);
        }
    }

    protected saveAbout(): void {
        if (!this.validate(this.aboutForm)) {
            return;
        }

        const value = this.aboutForm.getRawValue();
        this.api
            .updateAbout({
                title: value.title,
                text: value.text,
                facts: value.facts.map(({ icon, title, text, order, isActive }) => ({
                    icon,
                    title,
                    text,
                    order,
                    isActive,
                })),
            })
            .subscribe({
                next: (about) => {
                    this.patchAbout(about);
                    this.showSuccess('Блок «Обо мне» сохранён.');
                },
                error: () => this.showError(),
            });
    }

    protected newBenefit(): void {
        this.editingBenefitId.set(null);
        this.benefitForm.reset({
            icon: 'target',
            title: '',
            text: '',
            order: this.benefits().length + 1,
            isActive: true,
        });
    }

    protected editBenefit(benefit: AdminBenefit): void {
        this.editingBenefitId.set(benefit.id);
        this.benefitForm.reset(benefit);
    }

    protected saveBenefit(): void {
        if (!this.validate(this.benefitForm)) {
            return;
        }

        const id = this.editingBenefitId();
        const payload = this.benefitForm.getRawValue();
        const request = id
            ? this.api.updateBenefit(id, payload)
            : this.api.createBenefit(payload);

        request.subscribe({
            next: () => {
                this.loadBenefits();
                this.newBenefit();
                this.showSuccess('Преимущество сохранено.');
            },
            error: () => this.showError(),
        });
    }

    protected toggleBenefit(benefit: AdminBenefit): void {
        this.api
            .updateBenefit(
                benefit.id,
                this.mapBenefitPayload(benefit, !benefit.isActive),
            )
            .subscribe({
                next: () => this.loadBenefits(),
                error: () => this.showError(),
            });
    }

    protected deleteBenefit(benefit: AdminBenefit): void {
        if (!this.confirmDelete(benefit.title)) {
            return;
        }

        this.api.deleteBenefit(benefit.id).subscribe({
            next: () => {
                this.loadBenefits();
                this.showSuccess('Преимущество удалено.');
            },
            error: () => this.showError(),
        });
    }

    protected addDirectionItem(): void {
        this.directionItems.push(this.createDirectionItemForm());
    }

    protected removeDirectionItem(index: number): void {
        if (this.directionItems.length > 1) {
            this.directionItems.removeAt(index);
        }
    }

    protected newDirection(): void {
        this.editingDirectionId.set(null);
        this.directionForm.reset({
            icon: 'math',
            title: '',
            order: this.directions().length + 1,
            isActive: true,
        });
        this.replaceArray(this.directionItems, [this.createDirectionItemForm()]);
    }

    protected editDirection(direction: AdminDirection): void {
        this.editingDirectionId.set(direction.id);
        this.directionForm.patchValue(direction);
        this.replaceArray(
            this.directionItems,
            direction.items.map((item) => this.createDirectionItemForm(item)),
        );
    }

    protected saveDirection(): void {
        if (!this.validate(this.directionForm)) {
            return;
        }

        const id = this.editingDirectionId();
        const value = this.directionForm.getRawValue();
        const payload = {
            icon: value.icon,
            title: value.title,
            order: value.order,
            isActive: value.isActive,
            items: value.items.map(({ text, order, isActive }) => ({
                text,
                order,
                isActive,
            })),
        };
        const request = id
            ? this.api.updateDirection(id, payload)
            : this.api.createDirection(payload);

        request.subscribe({
            next: () => {
                this.loadDirections();
                this.newDirection();
                this.showSuccess('Направление сохранено.');
            },
            error: () => this.showError(),
        });
    }

    protected toggleDirection(direction: AdminDirection): void {
        this.api
            .updateDirection(
                direction.id,
                this.mapDirectionPayload(direction, !direction.isActive),
            )
            .subscribe({
                next: () => this.loadDirections(),
                error: () => this.showError(),
            });
    }

    protected deleteDirection(direction: AdminDirection): void {
        if (!this.confirmDelete(direction.title)) {
            return;
        }

        this.api.deleteDirection(direction.id).subscribe({
            next: () => {
                this.loadDirections();
                this.showSuccess('Направление удалено.');
            },
            error: () => this.showError(),
        });
    }

    protected newReview(): void {
        this.editingReviewId.set(null);
        this.reviewForm.reset({
            icon: 'quote',
            text: '',
            studentName: '',
            studentClass: '',
            imageUrl: '',
            order: this.reviews().length + 1,
            isActive: true,
        });
    }

    protected editReview(review: AdminReview): void {
        this.editingReviewId.set(review.id);
        this.reviewForm.reset({ ...review, imageUrl: review.imageUrl ?? '' });
    }

    protected saveReview(): void {
        if (!this.validate(this.reviewForm)) {
            return;
        }

        const id = this.editingReviewId();
        const payload = this.reviewForm.getRawValue();
        const request = id
            ? this.api.updateReview(id, payload)
            : this.api.createReview(payload);

        request.subscribe({
            next: () => {
                this.loadReviews();
                this.newReview();
                this.showSuccess('Отзыв сохранён.');
            },
            error: () => this.showError(),
        });
    }

    protected toggleReview(review: AdminReview): void {
        this.api
            .updateReview(
                review.id,
                this.mapReviewPayload(review, !review.isActive),
            )
            .subscribe({
                next: () => this.loadReviews(),
                error: () => this.showError(),
            });
    }

    protected deleteReview(review: AdminReview): void {
        if (!this.confirmDelete(review.studentName)) {
            return;
        }

        this.api.deleteReview(review.id).subscribe({
            next: () => {
                this.loadReviews();
                this.showSuccess('Отзыв удалён.');
            },
            error: () => this.showError(),
        });
    }

    private loadContent(): void {
        this.isLoading.set(true);
        forkJoin({
            about: this.api.getAbout(),
            benefits: this.api.getBenefits(),
            directions: this.api.getDirections(),
            reviews: this.api.getReviews(),
        }).subscribe({
            next: ({ about, benefits, directions, reviews }) => {
                if (about) {
                    this.patchAbout(about);
                }
                this.benefits.set(benefits);
                this.directions.set(directions);
                this.reviews.set(reviews);
                this.isLoading.set(false);
            },
            error: () => {
                this.isLoading.set(false);
                this.showError();
            },
        });
    }

    private loadBenefits(): void {
        this.api.getBenefits().subscribe({
            next: (benefits) => this.benefits.set(benefits),
            error: () => this.showError(),
        });
    }

    private loadDirections(): void {
        this.api.getDirections().subscribe({
            next: (directions) => this.directions.set(directions),
            error: () => this.showError(),
        });
    }

    private loadReviews(): void {
        this.api.getReviews().subscribe({
            next: (reviews) => this.reviews.set(reviews),
            error: () => this.showError(),
        });
    }

    private patchAbout(about: AdminAbout): void {
        this.aboutForm.patchValue({ title: about.title, text: about.text });
        this.replaceArray(
            this.aboutFacts,
            about.facts.map((fact) => this.createFactForm(fact)),
        );
    }

    private createFactForm(fact?: AdminFact) {
        return this.formBuilder.group({
            icon: [fact?.icon ?? 'user', Validators.required],
            title: [fact?.title ?? '', Validators.required],
            text: [fact?.text ?? '', Validators.required],
            order: [fact?.order ?? 1, Validators.required],
            isActive: [fact?.isActive ?? true],
        });
    }

    private createDirectionItemForm(item?: AdminDirectionItem) {
        return this.formBuilder.group({
            text: [item?.text ?? '', Validators.required],
            order: [item?.order ?? 1, Validators.required],
            isActive: [item?.isActive ?? true],
        });
    }

    private mapBenefitPayload(
        benefit: AdminBenefit,
        isActive = benefit.isActive,
    ): Omit<AdminBenefit, 'id'> {
        return {
            icon: benefit.icon,
            title: benefit.title,
            text: benefit.text,
            order: benefit.order,
            isActive,
        };
    }

    private mapDirectionPayload(
        direction: AdminDirection,
        isActive = direction.isActive,
    ): Omit<AdminDirection, 'id'> {
        return {
            icon: direction.icon,
            title: direction.title,
            order: direction.order,
            isActive,
            items: direction.items.map(({ text, order, isActive: itemIsActive }) => ({
                text,
                order,
                isActive: itemIsActive,
            })),
        };
    }

    private mapReviewPayload(
        review: AdminReview,
        isActive = review.isActive,
    ): Omit<AdminReview, 'id'> {
        return {
            icon: review.icon,
            text: review.text,
            studentName: review.studentName,
            studentClass: review.studentClass,
            imageUrl: review.imageUrl ?? '',
            order: review.order,
            isActive,
        };
    }

    private replaceArray<T>(array: FormArray, controls: T[]): void {
        array.clear();
        for (const control of controls) {
            array.push(control);
        }
    }

    private validate(form: { invalid: boolean; markAllAsTouched(): void }): boolean {
        if (!form.invalid) {
            return true;
        }

        form.markAllAsTouched();
        this.errorMessage.set('Заполните обязательные поля перед сохранением.');
        this.successMessage.set('');
        return false;
    }

    private confirmDelete(title: string): boolean {
        return window.confirm(`Удалить «${title}»? Это действие нельзя отменить.`);
    }

    private showSuccess(message: string): void {
        this.successMessage.set(message);
        this.errorMessage.set('');
    }

    private showError(): void {
        this.errorMessage.set(
            'Не удалось выполнить действие. Проверьте подключение к серверу и повторите попытку.',
        );
        this.successMessage.set('');
    }

    private clearMessages(): void {
        this.successMessage.set('');
        this.errorMessage.set('');
    }
}
