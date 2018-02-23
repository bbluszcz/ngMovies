import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  isValidated;
  errorMsg;
  d;

  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.isValidated = true;
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
    // this.authService.signinUser(email, password).catch(
    //   error => {
    //     console.log(error);
    //   }
    // );
  this.validateForm(form);
  }


    validateForm(form) {
      if (form.invalid && form.touched ) {
        this.isValidated = false;
      }
    }

}
