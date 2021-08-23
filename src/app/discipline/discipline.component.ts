import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DisciplineService } from '../services/discipline.service';
import { Disciplines } from '../models/discipline';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.css']
})
export class DisciplineComponent implements OnInit {
  public discipline = {} as Disciplines;
  public disciplines: Disciplines[];
  public message: any;


  constructor(private __disciplineService: DisciplineService) {
    this.disciplines = [];
  }

  ngOnInit() {
    this.getDiscipline();
  }

  getDiscipline() {
    this.__disciplineService.getDisciplines().subscribe((discipline: Disciplines[]) => {
      this.disciplines = discipline;
      console.log(this.disciplines);
    }, (error) => {  
      this.message = error;
    })
  };

   // delete discipline
  deleteDiscipline(discipline: Disciplines) {
    this.__disciplineService.deleteDiscipline(discipline).subscribe(() => {
      this.getDiscipline();
      this.message = this.getSucessMessage();
    }, (error) => {
      this.message = error;
    });
  }


  // define whether a discipline will be created or updated
  saveDiscipline(form: NgForm) {
    if (this.discipline.id !== undefined) {
      this.__disciplineService.updateDiscipline(this.discipline).subscribe(() => {
        this.cleanForm(form);
        this.message = this.getSucessMessage();
      }, (error) => {
        this.message = error;
      });
    } else {
        this.__disciplineService.saveDiscipline(this.discipline).subscribe(() => {
        this.cleanForm(form);
        this.message = this.getSucessMessage();
      }, (error) => {
        this.message = error;
      });
    }
  }

  // copies the discipline to be edited
  editDiscipline(discipline: Disciplines) {
    console.log(discipline);
    this.discipline = { ...discipline };
  }

  // clean form
  cleanForm(form: NgForm) {
    this.getDiscipline();
    form.resetForm();
    this.discipline = {} as Disciplines;
  }

  getSucessMessage() {
    return { status: 200, mensagem: "This action was successfully completed" };
  } 
}
