import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, State } from "@ngrx/store";
import { Observable, from } from "rxjs";
// import { User } from "../_models";
// import * as userLogins from '../_actions/userActions';
// import { UserState, getLogin } from '../_reducers'
// import { Router, ActivatedRoute } from '@angular/router';
// import { UserService } from '../_services/user.services'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.css',
    ]
})
export class LoginComponent {
    title = "Login"
    profileForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    });

    isCheckLogin: boolean = false;
    dataLogin = [
        {
            "id": 1,
            "name": "NGUYEN THANH HOA",
            "email": "nguyenthanhhoa.com@gmail.com",
            "password": "12345678",
            "remember_token": 'TYDAKSDJASLKDJASLKDJASDASD'
        },
        {
            "id": 2,
            "name": "SKIPPERHOA",
            "email": "skipperhoa2013@gmail.com",
            "password": "hoa123",
            "remember_token": 'TYDAKSDJASLKDJASLKDJASDASD'
        }
    ]

    // constructor(private _store: Store<UserState>, private router: Router, private _userService: UserService) { }
    // onSubmit() {
        // console.warn(this.profileForm.value['email']);
        // this.dataLogin.filter(item=>{
        /* if(item.email==this.profileForm.value['email'] && item.password==this.profileForm.value['password']){
             this.isCheckLogin=true;
             this._store.dispatch(new userLogins.CheckLoginAction({
                 id:item.id,
                 name:item.name,
                 email:item.email,
                 password:item.password,
                 remember_token:item.remember_token
              }));
         }*/

        // this._userService.login(this.profileForm.value).subscribe(item=>{
        //     if(item.success>0){
        //         console.log("Success login");
        //         this._store.dispatch(new userLogins.CheckLoginAction({
        //             id:item.data[0].id,
        //             name:item.data[0].name,
        //             email:item.data[0].email,
        //             password:item.data[0].password,
        //             remember_token:item.data[0].remember_token
        //         }));
        //         this.router.navigate(['/profile']);
        //     }
        // })

        // });
        /*  if(this.isCheckLogin){
               console.log("Success login");
               this.router.navigate(['/detail']);
          }
          else{
              console.log("Fail login");
          }
          */
    // }

}
