import { TestBed } from '@angular/core/testing';

import { TaskExecutionLogService } from './task-execution-log.service';

describe('ExecutionLogServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskExecutionLogService = TestBed.get(TaskExecutionLogService);
    expect(service).toBeTruthy();
  });
});
