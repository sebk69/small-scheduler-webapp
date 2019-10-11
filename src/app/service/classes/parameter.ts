/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

export enum parametersKeys {
  purgeExecutionLogs = 'purge-execution-logs',
  emailFrom = 'email-from',
}

export class Parameter {

  public id?: number;
  public key: string;
  public value?: string;
  public fromDb: boolean;

}
