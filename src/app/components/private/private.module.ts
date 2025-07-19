import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {CanActivateUserGuard} from '../../guards/user.guard';
import {ApisComponent} from './apis/apis.component';
import {KeysComponent} from './keys/keys.component';
import {LogsComponent} from './logs/logs.component';
import {ApiDetailsComponent} from './api-details/api-details.component';

const routes: Routes = [
  {
    path: '', component: SidebarComponent, canActivate: [CanActivateUserGuard], children: [
      {path: 'dashboard', component: DashboardComponent, title: 'Dashboard - NovaAPI'},
      {path: 'apis', component: ApisComponent, title: 'APIs - NovaAPI'},
      {path: 'api-details/:apiKey', component: ApiDetailsComponent, title: 'API Details - NovaAPI'},
      {path: 'keys', component: KeysComponent, title: 'Keys - NovaAPI'},
      {path: 'logs', component: LogsComponent, title: 'Logs - NovaAPI'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PrivateModule {
}
