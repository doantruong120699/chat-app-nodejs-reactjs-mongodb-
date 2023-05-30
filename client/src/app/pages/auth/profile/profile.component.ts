import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User, Profile } from '@app/_models';
import { ApplicationState } from '@app/store/reducers';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ProfileFormInterface, UploadAvatarInput } from './profile.interface';
import { UserService } from '@app/_services';
import { GetUserProfileLoadAction } from '@app/store/actions/user.action';
import { NotificationService } from '@app/_services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user$: Observable<User> = this.store.select(
    (state) => state.user.data.user
  );
  private subscriptions: Subscription[] = [];
  public user?: User;
  public profileForm!: FormGroup;
  public avatarForm!: FormGroup;
  public errors: string[] = [];
  public creatingForm: boolean = true;
  public isSubmit: boolean = false;
  public maxDate: Date = new Date();
  public imageSrc?: string;
  @ViewChild('inputFile') inputFile!: ElementRef;

  constructor(
    private store: Store<ApplicationState>,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.maxDate = new Date();
    this.subscriptions.push(
      this.user$.subscribe((sub) => {
        this.user = sub;
        if (sub) {
          this.profileForm = this.fb.group({
            firstName: new FormControl(
              sub.profile?.firstName,
              Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(50),
              ])
            ),
            lastName: new FormControl(
              sub.profile?.lastName,
              Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(50),
              ])
            ),
            gender: new FormControl(sub.profile?.gender, Validators.required),
            phoneNumber: new FormControl(
              sub.profile?.phoneNumber,
              Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(12),
              ])
            ),
            email: new FormControl(sub.email),
            address: new FormControl(sub.profile?.address || ''),
            birthday: new FormControl(
              sub.profile?.birthday,
              Validators.required
            ),
          });
          this.avatarForm = this.fb.group({
            avatar: new FormControl(null),
          });
          this.creatingForm = false;
        }
      })
    );
  }

  onSubmit({
    value,
    valid,
  }: {
    value: ProfileFormInterface;
    valid: boolean;
  }): void {
    console.log(value);
    if (valid) {
      this.userService.updateMyInfo(value).subscribe({
        next: (value: any) => {
          this.store.dispatch(new GetUserProfileLoadAction());
          this.notify.showSuccess(value['message'], 'Update Info');
        },
        error: (value: any) => {
          this.notify.showError(value, 'Update Info');
        },
      });
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  onSelectPhoto(event: any) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }

    this.avatarForm.patchValue({
      avatar: file,
    });
  }

  onSubmitAvatar({
    value,
    valid,
  }: {
    value: UploadAvatarInput;
    valid: boolean;
  }): void {
    if (valid) {
      this.userService.uploadAvatar(value).subscribe({
        next: (value: any) => {
          this.store.dispatch(new GetUserProfileLoadAction());
          this.notify.showSuccess(value['message'], 'Upload Avatar');
        },
        error: (value: any) => {
          this.notify.showError(value, 'Upload Avatar');
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
