import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskChangeLogComponent } from './task-change-log.component';

describe('TaskChangeLogComponent', () => {
  let component: TaskChangeLogComponent;
  let fixture: ComponentFixture<TaskChangeLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskChangeLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskChangeLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
