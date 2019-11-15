/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

export class User {
    public id: number;
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

  /**
   * Check if user has a role
   */
  public hasRole(role) {
      let hasRole = false;
      for (const item of this.roles) {
        switch (item) {
          case role:
            hasRole = true;
            break;
        }
      }

      return hasRole;
    }

  /**
   * Add a role
   */
  public addRole(roleToSet) {
      const hasRole = this.hasRole(roleToSet);

      if (!hasRole) {
        this.roles.push(roleToSet);
      }
    }

  /**
   * Remove a role
   */
  public removeRole(roleToRemove) {
      this.roles = this.roles.filter(item => item !== roleToRemove);
    }
}
