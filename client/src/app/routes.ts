import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PortalPlanComponent } from './portal-plan/portal-plan.component';
import { MyPlansComponent } from './my-plans/my-plans.component';
import { MyChatsComponent } from './my-chats/my-chats.component';
import { LastHourComponent } from './last-hour/last-hour.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';
import { ExtrasignupComponent } from './extrasignup/extrasignup.component';
import { MyPlansDetailComponent } from './my-plans-detail/my-plans-detail.component';
import { NewPlanComponent } from './new-plan/new-plan.component';
import { DetailRequestAndEditPlanComponent } from './detail-request-and-edit-plan/detail-request-and-edit-plan.component';
import { MyChatsSelectedComponent } from './my-chats-selected/my-chats-selected.component';

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
  { path: 'createplan',  component: NewPlanComponent },
  { path: 'myplans/editplan/:id',  component: DetailRequestAndEditPlanComponent },
  { path: 'mychats/:id',  component: MyChatsSelectedComponent },
];

export { myRoutes };
