import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './pages/layouts/main-layout/main-layout.component';
import { AuthGuardService, NavigateLoggedIn } from './_helper';

const routes: Routes = [
  { path: 'login', canActivate: [NavigateLoggedIn], loadChildren: () => import('./pages/auth/login/login.module').then(module => module.LoginModule)},
  { path: 'register', loadChildren: () => import('./pages/auth/register/register.module').then(module => module.RegisterModule)},
  {
    path: '',
    canActivate: [AuthGuardService],
    component: MainLayoutComponent,
    children: [
      { path: 'profile', loadChildren: () => import('./pages/auth/profile/profile.module').then(module => module.ProfileModule)},
      { path: '', loadChildren: () => import('./pages/home/home.module').then(module => module.HomeModule)},
      { path: 'post', loadChildren: () => import('./pages/post/post.module').then(module => module.PostModule)},
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
