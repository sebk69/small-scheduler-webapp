/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import { Injectable } from '@angular/core';
import {SmallHttpClientService} from './small-http-client.service';
import {Task} from './classes/task';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IUserData, UserService} from './user.service';
import {TaskChangeLog} from './classes/taskChangeLog';

export interface ITaskData {
  id: string;
  groupId: string;
  scheduledMinute: string;
  scheduledHour: string;
  scheduledDay: string;
  scheduledMonth: string;
  scheduledWeekday: string;
  command: string;
  queue: string;
  tasksChangesLogs: ITaskChangeLogData[];
  fromDb: boolean;
}

interface ITaskChangeLogData {
  id: string;
  taskId: string;
  userId: string;
  action: string;
  date: string;
  taskChangeLogUser: IUserData;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: SmallHttpClientService, private userService: UserService) { }

  /**
   * Extract interface to Task
   */
  public extractTask(data: ITaskData): Task {
    const task = new Task();

    task.id = <number><any>data.id;
    task.groupId = <number><any>data.groupId;
    task.scheduledMinute = data.scheduledMinute;
    task.scheduledHour = data.scheduledHour;
    task.scheduledDay = data.scheduledWeekday;
    task.scheduledMonth = data.scheduledMonth;
    task.scheduledWeekday = data.scheduledWeekday;
    task.command = data.command;
    task.queue = <number><any>data.queue;
    task.tasksChangesLogs = this.extractTaskChangeLogs(data.tasksChangesLogs);
    task.fromDb = data.fromDb;

    return task;
  }

  /**
   * Extract interface to TaskChangeLog array
   */
  private extractTaskChangeLogs(datas: ITaskChangeLogData[]): TaskChangeLog[] {
    const result: TaskChangeLog[] = [];

    for (const data of datas) {
      result.push(this.extractTaskChangeLog(data));
    }

    return result;
  }

  /**
   * Extract change log
   */
  private extractTaskChangeLog(data: ITaskChangeLogData): TaskChangeLog {
    const taskChangeLog = new TaskChangeLog();

    taskChangeLog.id = <number><any>data.id;
    taskChangeLog.taskId = <number><any>data.taskId;
    taskChangeLog.userId = <number><any>data.userId;
    taskChangeLog.action = data.action;
    taskChangeLog.date = data.date;
    taskChangeLog.taskChangeLogUser = this.userService.extractUser(data.taskChangeLogUser);

    return taskChangeLog;
  }

  /**
   * Extract interface to Task array
   */
  private extractTasks(datas: ITaskData[]): Task[] {
    const result: Task[] = [];

    for (const data of datas) {
      result.push(this.extractTask(data));
    }

    return result;
  }

  /**
   * Get task list for a group
   */
  public listForGroup(idGroup: number): Observable<Task[]> {
    return this.httpClient.get<ITaskData[]>('/api/tasks/groups/' + idGroup.toString())
        .pipe(map(data => this.extractTasks(data)));
  }

  /**
   * Update a task
   */
  public postTask(task: Task):Observable<Task> {
    return this.httpClient.post<ITaskData>('/api/tasks', task)
        .pipe(map(data => this.extractTask(data)));
  }

  /**
   * Delete a task
   * @param task
   */
  public deleteTask(task: Task): Observable<string> {
    return this.httpClient.delete('/api/tasks/' + task.id.toString());
  }
}
