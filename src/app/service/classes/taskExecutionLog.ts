/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import {Task} from './task';

export class TaskExecutionLog {
    id: number;
    taskId: number;
    queue: number;
    command: string;
    returnValue: number;
    stdout: string;
    stderr: string;
    date: string;
    fromDb: boolean;
    executionLogTask: Task;
}
