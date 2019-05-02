import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import HomeComponent from './home/home.component';
import LoginComponent from './login/login.component';
import RegisterComponent from './register/register.component';
import LandingPageComponent from './landing-page/landing-page.component';
import LandAssessmentComponent from './land-assessment/land-assessment.component';
import BuildingAssessmentComponent from './building-assessment/building-assessment.component';
import AssessmentsComponent from './assessments/assessments.component';
import ReassessmentsComponent from './reassessments/reassessments.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/:username', component: LandingPageComponent },
  { path: 'user/:username/assessments', component: AssessmentsComponent },
  { path: 'user/:username/assessments/land', component: LandAssessmentComponent },
  { path: 'user/:username/assessments/building', component: BuildingAssessmentComponent },
  { path: 'user/:username/reassessments', component: ReassessmentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  HomeComponent,
  LoginComponent,
  RegisterComponent,
  LandingPageComponent,
  LandAssessmentComponent,
  AssessmentsComponent,
  BuildingAssessmentComponent,
  ReassessmentsComponent
]
