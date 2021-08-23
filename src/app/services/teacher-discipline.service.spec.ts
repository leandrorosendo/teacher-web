import { TestBed } from '@angular/core/testing';

import { TeacherDisciplineService } from './teacher-discipline.service';

describe('TeacherDisciplineService', () => {
  let service: TeacherDisciplineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherDisciplineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
