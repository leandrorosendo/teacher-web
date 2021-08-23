import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Disciplines } from '../models/discipline';
import { Teachers } from '../models/teacher';
import { TeacherDisciplines } from '../models/teacher-disciplines';
import { DisciplineService } from '../services/discipline.service';
import { TeacherDisciplineService } from '../services/teacher-discipline.service';
import { TeacherService } from '../services/teacher.service';


@Component({
  selector: 'app-teacher-discipline',
  templateUrl: './teacher-discipline.component.html',
  styleUrls: ['./teacher-discipline.component.css']
})
export class TeacherDisciplineComponent implements OnInit {
  public message: any;
  public teachers: Teachers [];
  public disciplines: Disciplines [];
  public teacherDiscipline = {} as TeacherDisciplines;
  public teacherDisciplines: TeacherDisciplines[];

  constructor(private  __teacherService : TeacherService, private __teacherDisciplineService: TeacherDisciplineService ,private __disciplineService: DisciplineService) {
    this.teachers = [];
    this.disciplines = [];
    this.teacherDisciplines = [];
  }

  ngOnInit() {
    this.getTeacher();
    this.getDiscipline();
    this.getTeacherDiscipline();
  }

  getTeacher() {
    this.__teacherService.getTeachers().subscribe((teacher: Teachers[]) => { 
      this.teachers = teacher;
    }, (error) => {  
      this.message = error;
    })
  };

  getDiscipline() {
    this.__disciplineService.getDisciplines().subscribe((discipline: Disciplines[]) => { 
      this.disciplines = discipline;
    }, (error) => {  
      this.message = error;
    })
  };

  getTeacherDiscipline() {
    this.__teacherDisciplineService.getTeacherDisciplines().subscribe((teacherDiscipline: TeacherDisciplines[]) => { 
      this.teacherDisciplines = teacherDiscipline;
    }, (error) => {  
      this.message = error;
    })
  };


   // delete teacher discipline
   deleteTeacherDiscipline(teacherDiscipline: TeacherDisciplines) {
    this.__teacherDisciplineService.deleteTeacherDiscipline(teacherDiscipline).subscribe(() => {
      this.getTeacherDiscipline();
      this.message = this.getSucessMessage();
    }, (error) => {
      this.message = error;
    });
  }


  // define whether a teacher discipline will be created or updated
  saveTeacherDiscipline(form: NgForm) {
    if (this.teacherDiscipline.id !== undefined) {
      this.__teacherDisciplineService.updateTeacherDiscipline(this.teacherDiscipline).subscribe(() => {
        this.cleanForm(form);
        this.message = this.getSucessMessage();
      }, (error) => {
        this.message = error;
      });
    } else {
        this.__teacherDisciplineService.saveTeacherDiscipline(this.teacherDiscipline).subscribe(() => {
        this.cleanForm(form);
        this.message = this.getSucessMessage();
      }, (error) => {
        this.message = error;
      });
    }
  }

  // copies the teacher discipline to be edited
  editTeacherDiscipline(teacherDiscipline: TeacherDisciplines) {
    this.teacherDiscipline = { ...teacherDiscipline };
  }

  // clean form
  cleanForm(form: NgForm) {
    this.getTeacherDiscipline();
    form.resetForm();
    this.teacherDiscipline = {} as TeacherDisciplines;
  }

  getSucessMessage() {
    return { status: 200, mensagem: "This action was successfully completed" };
  } 


}
