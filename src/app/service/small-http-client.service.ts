/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

interface ILoginData {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class SmallHttpClientService {
  private token: string = null;

  constructor(private client: HttpClient) { }

  /**
   * Get token from data
   */
  private extractToken(data: ILoginData): boolean {
    this.token = data.token;

    localStorage.setItem('token', this.token);

    return true;
  }

  /**
   * Get the token for authentification
   */
  private getToken(): string {
    // If token is empty
    if (this.token === null) {
      // Get it from local storage
      this.token = localStorage.getItem('token');

      // If empty return null : not logged in
      if (this.token === null) {
        return null;
      }
    }

    return this.token;
  }

  /**
   * Return true if client is logged in
   */
  public isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  /**
   * Login to api
   */
  public login(username: string, password: string): Observable<boolean> {
    let httpHeaders: HttpHeaders;

    httpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
    });

    return this.client
      .post<ILoginData>(environment.apiBaseUrl + '/api/login_check', {username: username, password: password}, {headers: httpHeaders})
      .pipe(map(data => this.extractToken(data)));
  }

  /**
   * Remove token to logout
   */
  public logout() {
    this.token = null;
    localStorage.removeItem('token');
  }

  /**
   * Get url
   */
  public get<T>(url: string): Observable<T> {
    let httpHeaders: HttpHeaders;

    httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type':  'application/json',
    });

    return this.client.get<T>(environment.apiBaseUrl + url, {headers: httpHeaders});
  }

  public put<T>(url: string, body: any = ""): Observable<T> {

    let httpHeaders: HttpHeaders;

    httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type':  'application/json',
    });

    return this.client.put<T>(environment.apiBaseUrl + url, body, {headers: httpHeaders});
  }

  public post<T>(url: string, body: any = ''): Observable<T> {

    let httpHeaders: HttpHeaders;

    httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type':  'application/json',
    });

    return this.client.post<T>(environment.apiBaseUrl + url, body, {headers: httpHeaders});
  }

  public delete(url: string): Observable<string> {
    let httpHeaders: HttpHeaders;

    httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type':  'application/json',
    });

    return this.client.delete<string>(environment.apiBaseUrl + url, {headers: httpHeaders});
  }

}
