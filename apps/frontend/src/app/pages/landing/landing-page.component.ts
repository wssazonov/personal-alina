import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AboutComponent } from '../../components/about/about.component';
import { BenefitsComponent } from '../../components/benefits/benefits.component';
import { ContactsComponent } from '../../components/contacts/contacts.component';
import { DirectionsComponent } from '../../components/directions/directions.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormatComponent } from '../../components/format/format.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ReviewsComponent } from '../../components/reviews/reviews.component';
import { ContentService } from '../../core/content/content.service';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [
        HeaderComponent,
        HeroComponent,
        AboutComponent,
        BenefitsComponent,
        DirectionsComponent,
        FormatComponent,
        ReviewsComponent,
        ContactsComponent,
        FooterComponent,
    ],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
    private readonly content = inject(ContentService);

    protected readonly isLoading = this.content.isLoading;
}
