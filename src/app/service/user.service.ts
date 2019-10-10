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
}
