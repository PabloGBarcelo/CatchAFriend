import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { myRoutes } from './routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PortalPlanComponent } from './portal-plan/portal-plan.component';
import { MyPlansComponent } from './my-plans/my-plans.component';
import { MyChatsComponent } from './my-chats/my-chats.component';
import { LastHourComponent } from './last-hour/last-hour.component';
import { SettingsComponent } from './settings/settings.component';
import { PlanService } from '../services/plan.service';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    LandingPageComponent,
    PortalPlanComponent,
    MyPlansComponent,
    MyChatsComponent,
    LastHourComponent,
    SettingsComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(myRoutes),
  ],
  providers: [AuthService, PlanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
