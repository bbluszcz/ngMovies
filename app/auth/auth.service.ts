import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { findIndex } from "rxjs/operators";

@Injectable()
export class AuthService {
  isLogout = false;
  currentEmail: string;
  localStorage;
  currentUser: string;
  token: string;
  errorMsg: Promise<string>;

  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
          response => {
            this.router.navigate(['/movies']);
            firebase.auth().currentUser.getIdToken()
              .then(
                (token: string) => this.token = token
              );
            this.getCurrentUser(firebase.auth().currentUser);
          }
        )
      .catch(
        error => console.log(error)
      )
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/movies']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
            this.getCurrentUser(firebase.auth().currentUser);
            this.isLogout = false;
        }
      )
      .catch(
        error => {
        // console.log(error);
        // this.errorMsg = error;
        }
      );
  }

  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  getCurrentUser(currentUser) {
    this.currentEmail = firebase.auth().currentUser.email;
    this.currentUser = this.currentEmail.substring(0, this.currentEmail.indexOf('@'));
    console.log("this.currentUser ", this.currentUser);

  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/']);
    this.isLogout = true;
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    // localStorage.setItem("token", this.token);
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;

  }

  // isLocalStorageSet() {
  //   localStorage.getItem("token")
  // }

}
