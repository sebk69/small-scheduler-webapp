/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import {User} from './user';

export class Group {
  public id?: number;
  public creationUserId?: number;
  public label: string;
  public groupCreationUser?: User;
  public allowed?: boolean;
  public fromDb = false;
}
