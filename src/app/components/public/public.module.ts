import {RouterModule, Routes} from '@angular/router';
import {LandingPage} from './landing-page/landing-page';
import {NgModule} from '@angular/core';
import {Login} from './login/login';
import {Register} from './register/register';

const routes: Routes = [
  {path: '', component: LandingPage, title: 'NovaAPI'},
  {path: 'login', component: Login, title: 'Login - NovaAPI'},
  {path: 'register', component: Register, title: 'Register - NovaAPI'},
];

@NgModule({
  imports: [RouterModule.forChild(routes), LandingPage, Login],
})
export class PublicModule {
}
