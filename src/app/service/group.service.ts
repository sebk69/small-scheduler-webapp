/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import { Injectable } from '@angular/core';
import {IUserData, UserService} from './user.service';
import {SmallHttpClientService} from './small-http-client.service';
import {Group} from './classes/group';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface IGroupData {
  id: string;
  creationUserId: string;
  label: string;
  groupCreationUser: IUserData;
  fromDb: boolean;
}


@Injectable({
  providedIn: 'root'
})

export class GroupService {

  constructor(private httpClient: SmallHttpClientService, private userService: UserService) { }

  /**
   * Extract array of group interface to array of group
   */
  public extractGroups(data: IGroupData[]) {
    const groups: Group[] = [];

    for (const element of data) {
      groups.push(this.extractGroup(element));
    }

    return groups;
  }

  /**
   * Extract group interface to group
   */
  public extractGroup(data: IGroupData): Group {
    const group = new Group;

    group.id = <number><any>data.id;
    group.creationUserId = <number><any>data.creationUserId;
    group.label = data.label;
    if (data.groupCreationUser !== null) {
      group.groupCreationUser = this.userService.extractUser(data.groupCreationUser);
    } else {
      group.groupCreationUser = null;
    }
    group.fromDb = data.fromDb;

    return group;
  }

  /**
   * List groups
   */
  public getGroups(): Observable<Group[]> {
    return this.httpClient.get<IGroupData[]>('/api/groups')
      .pipe(map(data => this.extractGroups(data)));
  }

  /**
   * Update a group
   */
  public postGroup(group: Group): Observable<Group> {
    return this.httpClient.post<IGroupData>('/api/groups', group)
        .pipe(map(data => this.extractGroup(data)));
  }

  /**
   * Remove a group
   */
  public deleteGroup(group: Group): Observable<string> {
    return this.httpClient.delete('/api/groups/' + group.id.toString());
  }
}
