import { Injectable } from '@angular/core';
/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import {Parameter} from './classes/parameter';
import {SmallHttpClientService} from './small-http-client.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface IParameterData {
  id?: string;
  key: string;
  value?: string;
  fromDb: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  constructor(private httpClient: SmallHttpClientService) { }

  public extractParameter(data: IParameterData): Parameter {
    const parameter: Parameter = new Parameter();

    parameter.id = Number(data.id);
    parameter.key = data.key;
    parameter.value = data.value;
    parameter.fromDb = data.fromDb;

    return parameter;
  }

  public createInterfaceParameter(parameter: Parameter): IParameterData {
    const data = new class implements IParameterData {
      fromDb: boolean = parameter.fromDb;
      id: string = parameter.id.toString();
      key: string = parameter.key;
      value: string = parameter.value;
    };

    return data;
  }

  public get(key): Observable<Parameter> {
    return this.httpClient.get<IParameterData>('/api/parameter/' + key)
      .pipe(map(data => this.extractParameter(data)));
  }

  public set(parameter: Parameter): Observable<Parameter> {
    return this.httpClient.post<IParameterData>('/api/parameter', this.createInterfaceParameter(parameter))
      .pipe(map(data => this.extractParameter(data)));
  }
}
