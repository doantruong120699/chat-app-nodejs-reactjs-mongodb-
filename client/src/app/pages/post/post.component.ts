import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from '@app/_models';
import { ApplicationState } from '@app/store/reducers';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { PostFormInterface } from './post.interface';
import { PostService } from '@app/_services';
import { NotificationService } from '@app/_services/notification.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  public user$: Observable<User> = this.store.select(
    (state) => state.user.data.user
  );
  private subscriptions: Subscription[] = [];
  public user?: User;
  public postForm!: FormGroup;
  public imageSrc: string[] = [];
  public selectedFiles: File[] = [];

  @ViewChild('inputFile') inputFile!: ElementRef;

  constructor(
    private store: Store<ApplicationState>,
    private fb: FormBuilder,
    private postService: PostService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.user$.subscribe((sub) => {
        this.user = sub;
      })
    );
    this.postForm = this.fb.group({
      caption: new FormControl(''),
      photos: [[]],
    });
  }

  onSubmit({
    value,
    valid,
  }: {
    value: PostFormInterface;
    valid: boolean;
  }): void {
    if (valid) {
      const formData: any = new FormData();
      for (let file of this.selectedFiles) {
        formData.append('photos', file);
      }
      formData.append('caption', value.caption);
      this.postService.createPost(formData).subscribe({
        next: (value: any) => {
          console.log(value);
          this.notify.showSuccess(value['message'], 'Update Info');
        },
        error: (value: any) => {
          this.notify.showError(value, 'Update Info');
        },
      });
    }
  }

  onSelectPhoto(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      reader.readAsDataURL(files[0]);

      reader.onload = () => {
        this.imageSrc.push(reader.result as string);
        const image = new Image();
        image.src = reader.result as string;
        image.onload = () => {
          // const width = image.width;
          // const height = image.height;
          // files[0]['dimensions'] = {
          //   width: width,
          // };
          // console.log('Image dimensions:', width, height);
          // console.log('files: ', files);
        };
      };
      this.selectedFiles.push(files[0]);
    }
  }

  removeFiles(event: any) {
    this.selectedFiles = [];
    this.imageSrc = [];
  }

  autoGrowTextZone(e: any) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 25 + 'px';
  }
}
