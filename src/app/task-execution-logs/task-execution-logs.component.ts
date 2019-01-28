/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../service/classes/task';
import {TaskExecutionLogService} from '../service/task-execution-log.service';
import {TaskExecutionLog} from '../service/classes/taskExecutionLog';

@Component({
  selector: 'app-task-execution-logs',
  templateUrl: './task-execution-logs.component.html',
  styleUrls: ['./task-execution-logs.component.css']
})
export class TaskExecutionLogsComponent implements OnInit {

  @Input() task: Task;

  public maxEntries = '';
  public from = '';
  public to = '';

  public logs: TaskExecutionLog[] = [];

  constructor(private taskExecutionLogService: TaskExecutionLogService) { }

  ngOnInit() {
    this.onReload();
  }

  public onReload() {
    this.taskExecutionLogService.getLogs(this.task, this.maxEntries, this.from, this.to)
      .subscribe(data => this.logs = data, error => alert(error.error));
  }

}
