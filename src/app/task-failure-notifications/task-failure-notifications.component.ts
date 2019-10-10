/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import { Component, OnInit } from '@angular/core';
import {TaskFailureNotification} from '../service/classes/taskFailureNotification';
import {TaskFailureNotificationService} from '../service/task-failure-notification.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-failure-notifications',
  templateUrl: './task-failure-notifications.component.html',
  styleUrls: ['./task-failure-notifications.component.css']
})
export class TaskFailureNotificationsComponent implements OnInit {

  public groupsNotificationStates: TaskFailureNotification[] = [];

  constructor(private taskFailureNotificationService: TaskFailureNotificationService, private modalService: NgbModal) { }

  ngOnInit() {
    this.taskFailureNotificationService.getNotificationsStateForMyself()
      .subscribe(data => {this.groupsNotificationStates = data; } );
  }

  public onSubmit(content) {
    this.taskFailureNotificationService.postNotificationsStates(this.groupsNotificationStates)
      .subscribe(data => {
        for (const elementRemote of data) {
          for (const elementLocal of this.groupsNotificationStates) {
            if (elementRemote.groupId === elementLocal.groupId) {
              elementLocal.id = elementRemote.id;
              elementLocal.fromDb = elementRemote.fromDb;
              elementLocal.active = elementRemote.active;
            }
          }
        }
        this.modalService.open(content, {ariaLabelledBy: 'Notifications updated'}).result
          .then((result) => {}, (reason) => {});
      }, error => { alert('Une erreur est survenue.'); } );
  }

}
