import { Injectable } from '@angular/core';
import {SmallHttpClientService} from './small-http-client.service';
import {IUserData, UserService} from './user.service';
import {GroupService, IGroupData} from './group.service';
import {TaskFailureNotification} from './classes/taskFailureNotification';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {el} from "@angular/platform-browser/testing/src/browser_util";

interface ITaskFailureNotificationData {
  id?: string;
  userId: string;
  groupId: string;
  taskFailureNotificationUser?: IUserData;
  taskFailureNotificationGroup?: IGroupData;
  active?: string;
  fromDb: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskFailureNotificationService {

  constructor(private httpClient: SmallHttpClientService, private userService: UserService, private groupService: GroupService) { }

  /**
   * extract task failure notification state for a group and user to task failure notification
   */
  public extractTaskFailureNotification(data: ITaskFailureNotificationData): TaskFailureNotification {
    const taskFailureNotification = new TaskFailureNotification();

    taskFailureNotification.id = <number><any>data.id;
    taskFailureNotification.userId = <number><any>data.userId;
    taskFailureNotification.groupId = <number><any>data.groupId;

    if (data.active !== null)  {
      if (data.active === '0') {
        taskFailureNotification.active = false;
      } else {
        taskFailureNotification.active = true;
      }
    }

    if (data.taskFailureNotificationGroup !== null) {
      taskFailureNotification.group = this.groupService.extractGroup(data.taskFailureNotificationGroup);
    }

    if (data.taskFailureNotificationUser !== null) {
      taskFailureNotification.user = this.userService.extractUser(data.taskFailureNotificationUser);
    }

    taskFailureNotification.fromDb = data.fromDb;

    return taskFailureNotification;
  }

  /**
   * create task failure notifications interface
   */
  public taskFailureNotificationToInterface(taskFailureNotification: TaskFailureNotification): ITaskFailureNotificationData {
    const data: ITaskFailureNotificationData = new class implements ITaskFailureNotificationData {
      active: string;
      fromDb: boolean;
      groupId: string;
      id: string;
      taskFailureNotificationGroup: IGroupData;
      taskFailureNotificationUser: IUserData;
      userId: string;
    };

    data.id = taskFailureNotification.id !== null ? taskFailureNotification.id.toString() : null;
    data.groupId = taskFailureNotification.groupId !== null ? taskFailureNotification.groupId.toString() : null;
    data.userId = taskFailureNotification.userId !== null ? taskFailureNotification.userId.toString() : null;
    data.active = taskFailureNotification.active ? '1' : '0';
    data.fromDb = taskFailureNotification.fromDb;

    return data;
  }

  /**
   * extract an array of notifications interface to an array of notifications
   */
  public extractTaskFailureNotifications(data: ITaskFailureNotificationData[]) {
    const notifications: TaskFailureNotification[] = [];

    for (const element of data) {
      notifications.push(this.extractTaskFailureNotification(element));
    }

    return notifications;
  }

  /**
   * create array of task failure notifications interface
   */
  public taskFailureNotificationsToInterface(taskFailureNotifications: TaskFailureNotification[]): ITaskFailureNotificationData[] {
    const datas: ITaskFailureNotificationData[] = [];

    for (const element of taskFailureNotifications) {
      datas.push(this.taskFailureNotificationToInterface(element));
    }

    return datas;
  }

  /**
   * Get notification states by group
   */
  getNotificationsStateForMyself(): Observable<TaskFailureNotification[]> {
    return this.httpClient.get<ITaskFailureNotificationData[]>('/api/tasks/failure-notification/myself')
      .pipe(map(data => this.extractTaskFailureNotifications(data)));
  }

  /**
   * Post notification states
   */
  postNotificationsStates(states: TaskFailureNotification[]): Observable<TaskFailureNotification[]> {
    return this.httpClient.post<ITaskFailureNotificationData[]>(
      '/api/tasks/failure-notification',
      this.taskFailureNotificationsToInterface(states)
    )
      .pipe(map(data => this.extractTaskFailureNotifications(data)));
  }
}
