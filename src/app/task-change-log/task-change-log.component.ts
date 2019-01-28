/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import {Component, Input, OnInit} from '@angular/core';
import {TaskChangeLog} from '../service/classes/taskChangeLog';

@Component({
  selector: 'app-task-change-log',
  templateUrl: './task-change-log.component.html',
  styleUrls: ['./task-change-log.component.css']
})
export class TaskChangeLogComponent implements OnInit {

  @Input() taskChangeLogs: TaskChangeLog[];

  constructor() { }

  ngOnInit() {
  }

}
