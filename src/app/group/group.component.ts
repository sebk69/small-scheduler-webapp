/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import {Group} from '../service/classes/group';
import {Task} from '../service/classes/task';
import {TaskService} from '../service/task.service';
import {GroupService} from '../service/group.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {TaskChangeLog} from '../service/classes/taskChangeLog';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnChanges {

  @Input() selectedGroup: Group;
  @Output() event = new EventEmitter<string>();

  public tasks: Task[] = [];
  public editedTask: Task = null;
  public taskChangeLogs: TaskChangeLog[] = null;
  public groupErrorMessage = '';

  private taskToDelete: Task = null;

  constructor(private groupService: GroupService, private taskService: TaskService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.ngOnChanges();
  }

  ngOnChanges() {
    if (this.selectedGroup.fromDb) {
      this.taskService.listForGroup(this.selectedGroup.id)
          .subscribe(data => this.tasks = data);
    }
  }

  onSubmit() {
    this.groupErrorMessage = '';
    this.groupService.postGroup(this.selectedGroup)
        .subscribe(data => {this.selectedGroup = data; this.event.next('refreshEvent')}, error => this.groupErrorMessage = error.error)
  }

  onRemove() {
    this.groupService.deleteGroup(this.selectedGroup)
        .subscribe(data => {this.event.next('refreshEvent')}, error => this.groupErrorMessage = error.error );
  }

  onNewTask(content) {
    this.editedTask = new Task();
    this.editedTask.groupId = this.selectedGroup.id;
    this.modalService.open(content, {ariaLabelledBy: 'Update task'}).result
        .then((result) => { this.editedTask = null; }, (reason) => { this.editedTask = null; });
  }

  onEditTask(content, task: Task) {
    this.editedTask = task;
    this.modalService.open(content).result
        .then((result) => { this.editedTask = null; }, (reason) => { this.editedTask = null; });
  }

  onDeleteTaskConfirmation(content, task: Task) {
    this.taskToDelete = task;

    const modal = this.modalService.open(content, {ariaLabelledBy: 'Delete a task'});
    modal.result
        .then( result => { this.onDeleteTask(); this.taskToDelete = null; }, reason => { this.taskToDelete = null; } );
  }

  onDeleteTask() {
    this.taskService.deleteTask(this.taskToDelete)
        .subscribe(data => this.refreshEvent(), error => this.refreshEvent());
  }

  onChangeLog(content, task: Task) {
    this.taskChangeLogs = task.tasksChangesLogs;
    this.modalService.open(content, {ariaLabelledBy: 'Change log'}).result
        .then( result => { this.taskChangeLogs = null; }, reason => this.taskChangeLogs = null);
  }

  onExecutionLog(content, task: Task) {
    this.editedTask = task;
    this.modalService.open(content, {ariaLabelledBy: 'Execution log'}).result
        .then( result => { this.editedTask = null; }, reason => this.editedTask = null);
  }

  refreshEvent() {
    this.event.next('refreshEvent');
  }

}
