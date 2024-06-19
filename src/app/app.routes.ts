import { Routes } from '@angular/router';
import {CreateComponent} from './create/create/create.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/create', pathMatch: 'full' },
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent}
];
