/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../service/classes/task';
import {TaskService} from '../service/task.service';
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Output() event = new EventEmitter<string>();

  public errorMessage = '';
  public updated = false;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.errorMessage = '';
    this.updated = false;
    this.taskService.postTask(this.task)
      .subscribe(data => {
        this.task = data;
        this.event.next('refreshEvent');
        this.updated = true;
      }, error => this.errorMessage = error.error.replace('\n', '<br>') );
  }

  onToggleEnabled() {
    this.taskService.toggleEnabled(this.task)
      .subscribe(data => {
        this.task = data;
        this.event.next('refreshEvent');
        this.updated = true;
      }, error => this.errorMessage = error.error.replace('\n', '<br>') );
  }

  onExecute() {
    this.taskService.execute(this.task)
      .subscribe(data => {
        this.updated = true;
      }, error => this.errorMessage = error.error.replace('\n', '<br>') )
  }
}
