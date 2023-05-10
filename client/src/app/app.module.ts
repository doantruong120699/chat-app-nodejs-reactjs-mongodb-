import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProfileComponent } from './pages/auth/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService, ErrorInterceptor } from '@app/_helper';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // StoreModule.forRoot(reducers),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuardService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    ErrorInterceptor,
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
