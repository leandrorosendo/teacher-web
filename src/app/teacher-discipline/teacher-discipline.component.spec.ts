import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDisciplineComponent } from './teacher-discipline.component';

describe('TeacherDisciplineComponent', () => {
  let component: TeacherDisciplineComponent;
  let fixture: ComponentFixture<TeacherDisciplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDisciplineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
