import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PageLayoutComponent } from './page-layout/page-layout.component'
import { LoginLayoutComponent } from './login-layout/login-layout.component'
//import {FooterOnlyLayoutComponent} from './footer-only-layout/footer-only-layout.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: PageLayoutComponent,
  //   children: [
  //     { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
  //     { path: 'users', loadChildren: '../users/users.module#UsersModule' },
  //     { path: 'account-settings', loadChildren: '../account-settings/account-settings.module#AccountSettingsModule' },
  //   ]
  // },
  // {
  //   path: '',
  //   component: LoginLayoutComponent,
  //   children: [
  //     { path: 'login', loadChildren: '../login/login.module#LoginModule' },
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
