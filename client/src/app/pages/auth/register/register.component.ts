import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '@app/_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    // private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    // this.authService.register(this.f.username.value, this.f.email.value, this.f.password.value)
        // .pipe(first())
        // .subscribe({
        //     next: () => {
        //         // get return url from query parameters or default to home page
        //         const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        //         this.router.navigateByUrl(returnUrl);
        //     },
        //     error: error => {
        //         // this.alertService.error(error);
        //         this.loading = false;
        //     }
        // });
  }
}
