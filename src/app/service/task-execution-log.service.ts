/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import { Injectable } from '@angular/core';
import { TaskExecutionLog } from './classes/taskExecutionLog';
import {SmallHttpClientService} from './small-http-client.service';
import {Task} from './classes/task';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ITaskData, TaskService} from './task.service';

export interface ITaskExecutionLogData {
  id: string;
  taskId: string;
  queue: string;
  command: string;
  returnValue: string;
  stdout: string;
  stderr: string;
  date: string;
  executionLogTask: ITaskData;
  fromDb: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskExecutionLogService {

  constructor(private httpService: SmallHttpClientService, private taskService: TaskService) { }

  /**
   * Extract tasks execution logs from interface
   */
  public extractTaskExecutionLogs(data: ITaskExecutionLogData[]) {
    const taskExecutionLogs: TaskExecutionLog[] = [];

    for (const element of data) {
      taskExecutionLogs.push(this.extractTaskExecutionLog(element));
    }

    return taskExecutionLogs;
  }

  /**
   * Extract task execution log from interface
   */
  public extractTaskExecutionLog(iTaskExecutionLog: ITaskExecutionLogData): TaskExecutionLog {
    const taskExecutionLog = new TaskExecutionLog();

    taskExecutionLog.id = <number><any>iTaskExecutionLog.id;
    taskExecutionLog.taskId = <number><any>iTaskExecutionLog.taskId;
    taskExecutionLog.queue = <number><any>iTaskExecutionLog.queue;
    taskExecutionLog.command = iTaskExecutionLog.command;
    taskExecutionLog.returnValue = <number><any>iTaskExecutionLog.returnValue;
    taskExecutionLog.stdout = iTaskExecutionLog.stdout;
    taskExecutionLog.stderr = iTaskExecutionLog.stderr;
    taskExecutionLog.date = iTaskExecutionLog.date;
    taskExecutionLog.fromDb = iTaskExecutionLog.fromDb;
    if (iTaskExecutionLog.executionLogTask !== null) {
      taskExecutionLog.executionLogTask = this.taskService.extractTask(iTaskExecutionLog.executionLogTask);
    }

    return taskExecutionLog;
  }

  /**
   * Get execution logs for a task
   */
  public getLogs(task: Task, maxEntries: string, from: string, to: string): Observable<TaskExecutionLog[]> {
    return this.httpService.get<ITaskExecutionLogData[]>(
      '/api/taskExecutionLogs/' +
      task.id.toString() +
      '?maxEntries=' + maxEntries +
      '&from=' + from +
      '&to=' + to
    )
        .pipe(map(data => this.extractTaskExecutionLogs(data)));
  }

  public getLastErrors(): Observable<TaskExecutionLog[]> {
    return this.httpService.get<ITaskExecutionLogData[]>('/api/taskExecutionLogs/errors/10')
      .pipe(map(data => this.extractTaskExecutionLogs(data)));
  }
}
