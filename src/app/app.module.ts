import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatNativeDateModule, MatDatepickerModule, MatCheckboxModule, MatTableModule, MatSelectModule, MatInputModule, MatGridListModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandAssessmentComponent } from './land-assessment/land-assessment.component';
import { AssessmentsComponent } from './assessments/assessments.component';
import { BuildingAssessmentComponent } from './building-assessment/building-assessment.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReassessmentsComponent } from './reassessments/reassessments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MainNavComponent,
    LandingPageComponent,
    LandAssessmentComponent,
    AssessmentsComponent,
    BuildingAssessmentComponent,
    ReassessmentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  providers: [
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
