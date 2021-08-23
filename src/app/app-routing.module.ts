import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplineComponent } from './discipline/discipline.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherDisciplineComponent } from './teacher-discipline/teacher-discipline.component';

const routes: Routes = [
  { path: 'discipline', component: DisciplineComponent },
  { path: 'teacher', component: TeacherComponent },
  { path: 'teacher-discipline', component: TeacherDisciplineComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
