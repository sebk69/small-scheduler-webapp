/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import { Component, OnInit } from '@angular/core';
import {TaskFailureNotification} from "../service/classes/taskFailureNotification";
import {TaskFailureNotificationService} from "../service/task-failure-notification.service";

@Component({
  selector: 'app-task-failure-notifications',
  templateUrl: './task-failure-notifications.component.html',
  styleUrls: ['./task-failure-notifications.component.css']
})
export class TaskFailureNotificationsComponent implements OnInit {

  public groupsNotificationStates: TaskFailureNotification[] = [];

  constructor(private taskFailureNotificationService: TaskFailureNotificationService) { }

  ngOnInit() {
    this.taskFailureNotificationService.getNotificationsStateForMyself()
      .subscribe(data => {this.groupsNotificationStates = data;})
  }

  public onSubmit() {
    console.log(this.groupsNotificationStates[0].active);
  }

}
