import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { myRoutes } from './routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
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
import { MyPlansDetailComponent } from './my-plans-detail/my-plans-detail.component';
import { ImageUploadModule } from "angular2-image-upload";
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import 'hammer-timejs';
import { NewPlanComponent } from './new-plan/new-plan.component';
import {CalendarModule} from 'primeng/primeng';
import { DetailRequestAndEditPlanComponent } from './detail-request-and-edit-plan/detail-request-and-edit-plan.component';
import { ChatService } from '../services/chat.service';
import { MyChatsSelectedComponent } from './my-chats-selected/my-chats-selected.component';
import { MomentModule } from 'angular2-moment';
import { TimeAgoPipe } from 'time-ago-pipe';
import { TruncateModule } from 'ng2-truncate';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    PortalPlanComponent,
    MyPlansComponent,
    MyChatsComponent,
    LastHourComponent,
    SettingsComponent,
    SignupComponent,
    ExtrasignupComponent,
    MyPlansDetailComponent,
    NewPlanComponent,
    DetailRequestAndEditPlanComponent,
    MyChatsSelectedComponent,
    TimeAgoPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(myRoutes),
    ImageUploadModule.forRoot(),
    ReactiveFormsModule,
    CalendarModule,
    MomentModule,
    TruncateModule,
    AgmCoreModule.forRoot({
     apiKey: "AIzaSyCU9On2sVtMW2yuerirL0yGkJ5KqL-A26o",
     libraries: ["places"]
   }),
  ],
  providers: [AuthService, PlanService, CategoriesService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
