import { OnInit } from "@angular/core";
import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit  {
token: string;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {
  }
  ngOnInit() {
  }


  onSaveData() {
    this.dataStorageService.storeMovies()
      .subscribe(
        (response: Response) => {
        }
      );
    this.dataStorageService.storeFavActors()
      .subscribe(
        (response: Response) => {
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
