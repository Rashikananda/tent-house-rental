import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardServiceGuard } from './guard-service.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { TransacionComponent } from './transacion/transacion.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [GuardServiceGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SigninComponent, canActivate: [GuardServiceGuard] },
  { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),  canActivate: [GuardServiceGuard] },
  { path: 'transc', component: TransacionComponent, canActivate: [GuardServiceGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
