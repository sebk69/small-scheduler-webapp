/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import {User} from './user';

export class TaskChangeLog {
    id: number;
    taskId: number;
    userId: number;
    action: string;
    date: string;
    taskChangeLogUser: User;
}