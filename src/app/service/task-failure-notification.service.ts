import { Injectable } from '@angular/core';
import {SmallHttpClientService} from "./small-http-client.service";
import {IUserData, UserService} from "./user.service";
import {GroupService, IGroupData} from "./group.service";
import {User} from "./classes/user";
import {Group} from "./classes/group";
import {TaskFailureNotification} from "./classes/taskFailureNotification";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

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

  constructor(private httpClient:SmallHttpClientService, private userService:UserService, private groupService:GroupService) { }

  /**
   * extract task failure notification state for a group and user to task failure notification
   */
  public extractTaskFailureNotification(data:ITaskFailureNotificationData):TaskFailureNotification {
    var taskFailureNotification = new TaskFailureNotification();

    taskFailureNotification.id = <number><any>data.id;
    taskFailureNotification.userId = <number><any>data.userId;
    taskFailureNotification.groupId = <number><any>data.groupId;

    if(data.active !== null)  {
      if(data.active === "0") {
        taskFailureNotification.active = false;
      } else {
        taskFailureNotification.active = true;
      }
    }

    if(data.taskFailureNotificationGroup !== null) {
      taskFailureNotification.group = this.groupService.extractGroup(data.taskFailureNotificationGroup);
    }

    if(data.taskFailureNotificationUser !== null) {
      taskFailureNotification.user = this.userService.extractUser(data.taskFailureNotificationUser);
    }

    return taskFailureNotification;
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
   * Get notification states by group
   */
  getNotificationsStateForMyself():Observable<TaskFailureNotification[]> {
    return this.httpClient.get<ITaskFailureNotificationData[]>('/api/tasks/failure-notification/myself')
      .pipe(map(data => this.extractTaskFailureNotifications(data)));
  }
}
