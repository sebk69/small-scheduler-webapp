/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import { Component, OnInit } from '@angular/core';
import {ParameterService} from '../service/parameter.service';
import {Parameter, parametersKeys} from '../service/classes/parameter';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent implements OnInit {
  public purgExecutionLogs?: Parameter;

  constructor(private parameterService: ParameterService) { }

  ngOnInit() {
    this.parameterService.get(parametersKeys.purgeExecutionLogs)
      .subscribe(data => {
        this.purgExecutionLogs = data;
      } );
  }

  onValidate(parameter: Parameter) {
    this.parameterService.set(parameter)
      .subscribe(data => parameter = data );
  }
}
