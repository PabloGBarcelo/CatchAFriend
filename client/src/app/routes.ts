import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PortalPlanComponent } from './portal-plan/portal-plan.component';
import { MyPlansComponent } from './my-plans/my-plans.component';
import { MyChatsComponent } from './my-chats/my-chats.component';
import { LastHourComponent } from './last-hour/last-hour.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';
import { ExtrasignupComponent } from './extrasignup/extrasignup.component';
import { SwipeComponent } from './swipe/swipe.component';
import { MyPlansDetailComponent } from './my-plans-detail/my-plans-detail.component';

const myRoutes: Routes = [
  { path: '',  component: LandingPageComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'portal',  component: PortalPlanComponent },
  { path: 'myplans',  component: MyPlansComponent },
  { path: 'myplans/:id',  component: MyPlansDetailComponent },
  { path: 'mychats',  component: MyChatsComponent },
  { path: 'lasthour',  component: LastHourComponent },
  { path: 'settings',  component: SettingsComponent },
  { path: 'signup',  component: SignupComponent },
  { path: 'extrasignup',  component: ExtrasignupComponent },
  { path: 'welcome', redirectTo: 'extrasignup', pathMatch: 'full' },
  { path: 'swipe',  component: SwipeComponent },

];

export { myRoutes };
