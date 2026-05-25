import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { DirectionsComponent } from './components/directions/directions.component';
import { FormatComponent } from './components/format/format.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
    selector: 'app-root',
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
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
