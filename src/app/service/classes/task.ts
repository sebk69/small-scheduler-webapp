/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import {TaskChangeLog} from './taskChangeLog';

export class Task {
    public id: number;
    groupId: number;
    scheduledMinute: string;
    scheduledHour: string;
    scheduledDay: string;
    scheduledMonth: string;
    scheduledWeekday: string;
    command: string;
    queue: number;
    tasksChangesLogs: TaskChangeLog[];
    fromDb: boolean;

    constructor() {}
}
