/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {SmallHttpClientService} from '../service/small-http-client.service';
import {Task} from '../service/classes/task';
import {TaskService} from '../service/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private _screen = 'home';
  public tasks: Task[];

  constructor(
    public userService: UserService,
    private taskService: TaskService,
    private http: SmallHttpClientService,
    private router: Router
  ) {
    userService.getMyself();
    taskService.listForGroup(1)
        .subscribe(data => this.tasks = data );
  }

  set screen(value: string) {
    this._screen = value;
    localStorage.setItem('screen', value);
  }

  get screen(): string {
    return this._screen;
  }

  ngOnInit() {
    this.screen = localStorage.getItem('screen');
  }

  onProfile() {
    this.screen = 'profile';
  }

  onTaskFailureNotifications() {
    this.screen = 'task-failure-notifications';
  }

  onErrors() {
    this.screen = 'errors';
  }

  onGroups() {
    this.screen = 'groups';
  }

  onParameters() {
    this.screen = 'parameter';
  }

  onLogout() {
    this.http.logout();
    this.router.navigateByUrl('/login');
  }
}
