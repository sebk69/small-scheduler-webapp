import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFailureNotificationsComponent } from './task-failure-notifications.component';

describe('TaskFailureNotificationsComponent', () => {
  let component: TaskFailureNotificationsComponent;
  let fixture: ComponentFixture<TaskFailureNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskFailureNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFailureNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
