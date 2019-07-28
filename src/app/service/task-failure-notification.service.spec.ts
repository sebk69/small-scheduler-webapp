import { TestBed } from '@angular/core/testing';

import { TaskFailureNotificationService } from './task-failure-notification.service';

describe('TaskFailureNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskFailureNotificationService = TestBed.get(TaskFailureNotificationService);
    expect(service).toBeTruthy();
  });
});
