/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public lostPasswordUsername: string;
  public lostPasswordModal: NgbModalRef = null;

  private _errorMessage = '';
  private _username = '';
  private _password = '';

  constructor(private userService: UserService, private router: Router, private modalService: NgbModal) {
    this.lostPasswordUsername = '';
  }


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

  /**
   * Lost password
   */
  public onLostPassword(content): void {
    this.lostPasswordModal = this.modalService.open(content, {ariaLabelledBy: 'Lost password form'});
    this.lostPasswordModal.result.then((result) => {}, (reason) => {});
  }

  public onConfirmLostPassword(): void {
    this.userService.lostPassword(this.lostPasswordUsername)
      .subscribe( data => this.lostPasswordModal.close(), error => {
        this.lostPasswordModal.close();
        this._errorMessage = 'Can\'t send email';
      } );
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
