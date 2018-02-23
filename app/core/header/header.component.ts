import { OnInit } from "@angular/core";
import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit  {
token: string;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {
  }
  ngOnInit() {
//     this.token = localStorage.getItem("token");
//     if (this.token) { this.authService.token = this.token
//      console.log("this.token ", this.token);
//  }
  }


  onSaveData() {
    this.dataStorageService.storeMovies()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
    this.dataStorageService.storeFavActors()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getMovies();
    this.dataStorageService.getFavActors();
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
