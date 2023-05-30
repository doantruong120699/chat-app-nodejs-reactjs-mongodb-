import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Post } from '@app/_models';
import { transformTime } from '@app/utils/string';

@Component({
  selector: 'post-component',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnDestroy, OnChanges {
  @Input() post!: Post;
  public parseTime = transformTime;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  ngOnChanges(): void {}
}
