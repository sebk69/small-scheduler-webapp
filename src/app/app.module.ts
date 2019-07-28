/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './service/user.service';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SmallHttpClientService } from './service/small-http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { GroupsComponent } from './groups/groups.component';
import {TaskService} from './service/task.service';
import { GroupComponent } from './group/group.component';
import { TaskComponent } from './task/task.component';
import {safeHtmlPipe} from './pipe/safeHtml';
import { TaskChangeLogComponent } from './task-change-log/task-change-log.component';
import { TaskExecutionLogsComponent } from './task-execution-logs/task-execution-logs.component';
import { ErrorsComponent } from './errors/errors.component';
import { TaskFailureNotificationsComponent } from './task-failure-notifications/task-failure-notifications.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    GroupsComponent,
    GroupComponent,
    TaskComponent,
    safeHtmlPipe,
    TaskChangeLogComponent,
    TaskExecutionLogsComponent,
    ErrorsComponent,
    TaskFailureNotificationsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: false }
    ),
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    TaskService,
    UserService,
    SmallHttpClientService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
