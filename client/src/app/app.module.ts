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
import { ExtrasignupComponent } from './extrasignup/extrasignup.component';
import { CategoriesService } from '../services/categories.service';
import { SwipeComponent } from './swipe/swipe.component';
import { MyPlansDetailComponent } from './my-plans-detail/my-plans-detail.component';
import { ImageUploadModule } from "angular2-image-upload";
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import 'hammer-timejs';
import { NewPlanComponent } from './new-plan/new-plan.component';

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
    SignupComponent,
    ExtrasignupComponent,
    SwipeComponent,
    MyPlansDetailComponent,
    NewPlanComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(myRoutes),
    ImageUploadModule.forRoot(),
    ReactiveFormsModule,
    DateTimePickerModule,
    AgmCoreModule.forRoot({
     apiKey: "AIzaSyCU9On2sVtMW2yuerirL0yGkJ5KqL-A26o",
     libraries: ["places"]
   }),
  ],
  providers: [AuthService, PlanService, CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
