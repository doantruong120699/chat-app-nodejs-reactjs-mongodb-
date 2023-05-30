import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthEffect } from '@app/store/effects';
import { AuthService } from '@app/_services';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { viLocale } from 'ngx-bootstrap/locale';
defineLocale('vi', viLocale);

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([
      // AuthEffect
    ]),
    BsDatepickerModule.forRoot(),
    ProfileRoutingModule,
  ],
  providers: [AuthService],
})
export class ProfileModule {}
