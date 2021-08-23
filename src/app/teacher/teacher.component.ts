import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Teachers } from '../models/teacher';
import {TeacherService} from  '../services/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  public teacher = {} as Teachers;
  public teachers: Teachers[];
  public message: any;


  constructor(private __teacherService: TeacherService) {
    this.teachers = [];
  }

  ngOnInit() {
    this.getTeacher();
  }

  getTeacher() {
    this.__teacherService.getTeachers().subscribe((teacher: Teachers[]) => {
      this.teachers = teacher;
    }, (error) => {  
      this.message = error;
    })
  };

   // delete teacher
  deleteTeacher(teacher: Teachers) {
    this.__teacherService.deleteTeacher(teacher).subscribe(() => {
      this.getTeacher();
      this.message = this.getSucessMessage();
    }, (error) => {
      this.message = error;
    });
  }


  // define whether a teacher will be created or updated
  saveTeacher(form: NgForm) {
    if (this.teacher.id !== undefined) {
      this.__teacherService.updateTeacher(this.teacher).subscribe(() => {
        this.cleanForm(form);
        this.message = this.getSucessMessage();
      }, (error) => {
        this.message = error;
      });
    } else {
        this.__teacherService.saveTeacher(this.teacher).subscribe(() => {
        this.cleanForm(form);
        this.message = this.getSucessMessage();
      }, (error) => {
        this.message = error;
      });
    }
  }

  // copies the teacher to be edited
  editTeacher(teacher: Teachers) {
    this.teacher = { ...teacher };
  }

  // clean form
  cleanForm(form: NgForm) {
    this.getTeacher();
    form.resetForm();
    this.teacher = {} as Teachers;
  }

  getSucessMessage() {
    return { status: 200, mensagem: "This action was successfully completed" };
  } 
}