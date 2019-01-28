import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskExecutionLogsComponent } from './task-execution-logs.component';

describe('TaskExecutionLogsComponent', () => {
  let component: TaskExecutionLogsComponent;
  let fixture: ComponentFixture<TaskExecutionLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskExecutionLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskExecutionLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
