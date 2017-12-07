import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PortalPlanComponent } from './portal-plan/portal-plan.component';
import { MyPlansComponent } from './my-plans/my-plans.component';
import { MyChatsComponent } from './my-chats/my-chats.component';
import { LastHourComponent } from './last-hour/last-hour.component';
import { SettingsComponent } from './settings/settings.component';

const myRoutes: Routes = [
  { path: '',  component: LandingPageComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'portal',  component: PortalPlanComponent },
  { path: 'myplans',  component: MyPlansComponent },
  { path: 'mychats',  component: MyChatsComponent },
  { path: 'lasthour',  component: LastHourComponent },
  { path: 'settings',  component: SettingsComponent },
];

export { myRoutes };
