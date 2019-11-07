/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {User} from './classes/user';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SmallHttpClientService} from './small-http-client.service';
import {forEach} from "@angular/router/src/utils/collection";


export interface IUserData {
  id: string;
  email: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
  roles: string[];
  enabled: boolean;
  fromDb: boolean;
}

export class CreateUserForm {
  public email = '';
  public nickname = '';
  public password = '';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User = null;

  constructor(private router: Router, private httpClient: SmallHttpClientService) { }

  /**
   * Extract user data
   */
  public extractUser(data: IUserData): User {
    const user = new User();

    user.id = data.id;
    user.email = data.email;
    user.nickname = data.nickname;
    user.createdAt = data.createdAt;
    user.updatedAt = data.updatedAt;
    user.roles = data.roles;
    user.enabled = data.enabled;
    user.fromDb = data.fromDb;

    return user;
  }

  /**
   * Extract users data
   */
  public extractUsers(datas: IUserData[]): User[] {
    const users: User[] = [];

    for (const data of datas) {
      users.push(this.extractUser(data));
    }

    return users;
  }

  /**
   * Login
   */
  public login(username: string, password: string): Observable<boolean> {
    return this.httpClient.login(username, password);
  }

  /**
   * logout and redirect to login screen
   */
  public logout(): void {
    this.router.navigateByUrl('/login');
  }

  /**
   * Get current user
   */
  public getMyself() {
    return this.httpClient.get<IUserData>('/api/users/myself')
      .pipe(map(data => this.extractUser(data)))
      .subscribe(data => this.user = data, error => this.logout() );
  }

  /**
   * Update user
   */
  public put(user: User) {
    return this.httpClient.put<IUserData>('/api/users', user)
      .pipe(map(data => this.extractUser(data)));
  }

  /**
   * Create user
   */
  public createUser(userForm: CreateUserForm) {
    return this.httpClient.post<IUserData>('/api/users', userForm)
      .pipe(map(data => this.extractUser(data)));
  }

  /**
   * Check current user password
   */
  public checkPassword(password) {
    return this.httpClient.post<string>('/api/users/password', {password: password});
  }

  /**
   * Send lost password email
   */
  public lostPassword(username) {
    return this.httpClient.post<string>('/security/passwordLost', {username: username});
  }

  /**
   * Get users list
   */
  public listUsers() {
    return this.httpClient.get<IUserData[]>('/api/users')
      .pipe(map(data => this.extractUsers(data)));
  }
}
