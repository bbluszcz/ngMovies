import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAwKQ4pC2P-fpY3NPJNpw49os1pgpQnn7U',
      authDomain: 'ng-movie-base.firebaseapp.com',
    });
  }

}
