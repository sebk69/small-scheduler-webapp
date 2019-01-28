/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../service/classes/user';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User;
  public oldPassword = '';
  public errorMessage: string;
  public modalErrorMessage: string;
  private modal: NgbModalRef = null;

  constructor(private userService: UserService, private modalService: NgbModal) {
    this.user = cloneDeep(this.userService.user);
  }

  ngOnInit() {
    this.errorMessage = '';
  }

  onUpdate(content) {
    this.oldPassword = '';
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'Update profile confirmation'});
    this.modal.result.then((result) => {
    }, (reason) => {});
  }

  onConfirm() {
    this.userService.checkPassword(this.oldPassword)
      .subscribe(response => {
        this.userService.put(this.user)
          .subscribe(data => {
            this.modal.close();
            if (this.user.plainPassword !== '' && this.user.plainPassword !== null) {
              this.oldPassword = this.user.plainPassword;
            }
            this.userService.login(this.user.email, this.oldPassword)
              .subscribe(success => {
                this.errorMessage = '';
                this.user = data;
                this.userService.getMyself();
              }, error => {
                this.errorMessage = 'Somthing got wrong. Please contact administrator.';
              });
          }, error => { this.errorMessage = error; });
      }, error => {
          this.modalErrorMessage = 'Password mistake';
      });
  }

}
