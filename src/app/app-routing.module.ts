import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import HomeComponent from './home/home.component';
import LoginComponent from './login/login.component';
import RegisterComponent from './register/register.component';
import LandingPageComponent from './landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/:username', component: LandingPageComponent}
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
  LandingPageComponent
]
