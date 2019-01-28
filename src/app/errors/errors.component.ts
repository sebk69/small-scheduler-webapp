import { Component, OnInit } from '@angular/core';
import {TaskExecutionLogService} from '../service/task-execution-log.service';
import {TaskExecutionLog} from '../service/classes/taskExecutionLog';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  private infinite: Observable<number>;
  public errors: TaskExecutionLog[] = [];

  constructor(private taskExecutionLogsService: TaskExecutionLogService) { }

  ngOnInit() {
    this.infinite = Observable.timer(0, 10000);

    this.infinite.subscribe(tick => this.loadErrors() );
  }

  private loadErrors() {
    this.taskExecutionLogsService.getLastErrors()
      .subscribe(data => this.errors = data);
  }

}
