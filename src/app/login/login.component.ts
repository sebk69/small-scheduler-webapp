/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private _errorMessage = '';
  private _username = '';
  private _password = '';

  constructor(private userService: UserService, private router: Router) { }


  /**
   * login or show error message
   */
  public onLogin(): void {
    if (this._username === '' || this._password === '') {
      this._errorMessage = 'You must specify username and password';
      return;
    }

    this.userService.login(this._username, this._password)
      .subscribe(success => {
        this._errorMessage = '';
        localStorage.setItem('screen', 'errors');
        this.router.navigateByUrl('/home');
      }, error => {
        this._errorMessage = 'Bad credentials';
      });
  }

  get errorMessage(): string {
      return this._errorMessage;
  }

  get username(): string {
      return this._username;
  }

  set username(value: string) {
      this._username = value;
  }

  get password(): string {
      return this._password;
  }

  set password(value: string) {
      this._password = value;
  }
}
