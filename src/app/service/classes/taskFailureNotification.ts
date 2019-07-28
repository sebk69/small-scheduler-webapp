/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import {User} from './user';
import {Group} from "./group";

export class TaskFailureNotification {
  public id?: number;
  public userId: number;
  public groupId: number;
  public user?: User;
  public group?: Group;
  public active?: boolean;
  public fromDb: boolean = false;
}
