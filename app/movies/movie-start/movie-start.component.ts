import { AuthService } from "./../../auth/auth.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-start',
  templateUrl: './movie-start.component.html',
})
export class MovieStartComponent implements OnInit {

  isAuthenticated: boolean;
  isLogout: boolean;
  currentUser: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated()
    this.currentUser = this.authService.currentUser;
    this.isLogout = this.authService.isLogout;
  }

}
