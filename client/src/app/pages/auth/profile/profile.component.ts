import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, Profile } from '@app/_models';
import { ApplicationState } from '@app/store/reducers';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ProfileFormInterface } from './profile.interface';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user$: Observable<User> = this.store.select(state => state.user.data.user);
  private subscriptions: Subscription[] = [];
  public user?: User;
  public profileForm!: FormGroup;
  public errors: string[] = [];
  public creatingForm: boolean = true;
  public isSubmit: boolean = false;
  public maxDate: Date = new Date();
  @ViewChild('inputFile') inputFile!: ElementRef;

  constructor(
    private store: Store<ApplicationState>,
    private router: Router,
    private fb: FormBuilder,
    private localService: BsLocaleService,
  ) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.subscriptions.push(
      this.user$.subscribe(sub => {
        this.user = sub;
        if(sub){
          this.profileForm = this.fb.group({
            'first_name': new FormControl(sub.first_name, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])),
            'last_name': new FormControl(sub.last_name, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])),
            'gender': new FormControl(sub.profile?.gender, Validators.required),
            'phone': new FormControl(sub.profile?.phonenumber === null ? '' : sub.profile?.phonenumber || ''),
            'email': new FormControl(sub.email),
            'address': new FormControl(sub.profile?.address || ''),
            'birthday': new FormControl(sub.profile?.birthday, Validators.required),
            'avatar': new FormControl(null),
          });
          this.creatingForm = false;
        }
      })
    );
  }

  onSubmit({ value, valid }: { value: ProfileFormInterface, valid: boolean }): void {
    console.log('valid', valid);
    console.log('form', this.profileForm);
  }


  onFileSelect(event: any) {
    // const file = (event?.target as HTMLInputElement).files[0];
    // if (!file) {
    //   return;
    // }
    // if (file.size > 0.3 * 1024 * 1024) {
    //   this.inputFile.nativeElement.value = null;
    //   return;
    // }
    // this.profileForm.patchValue({
    //   avatar: file
    // });
    // this.profileForm?.get('avatar').updateValueAndValidity()
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
