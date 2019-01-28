/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

export class User {
    public id: string;
    public email: string = null;
    public nickname: string = null;
    public createdAt: string = null;
    public updatedAt: string = null;
    public roles: string[] = null;
    public enabled: boolean = null;
    public plainPassword: string = null;
    public plainPasswordConfirm: string = null;
    public fromDb: boolean;

    constructor() {}
}
