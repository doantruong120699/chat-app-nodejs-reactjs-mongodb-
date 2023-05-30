import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthEffect, PostEffect } from '@app/store/effects';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { PostComponent } from '@app/components/post/post.component';

@NgModule({
  declarations: [HomeComponent, PostComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([PostEffect]),
  ],
  providers: [],
})
export class HomeModule {}
