import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PostComponent } from './post.component';
import { PostRoutingModule } from './post-routing.module';
import { PostService } from '@app/_services';
@NgModule({
  declarations: [PostComponent],
  imports: [CommonModule, PostRoutingModule, ReactiveFormsModule],
  providers: [PostService],
})
export class PostModule {}
