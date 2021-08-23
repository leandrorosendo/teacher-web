import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from "@angular/common/http";
import { NotificationsComponent } from './notifications/notifications.component';
import { TeacherService } from './services/teacher.service';
import { DisciplineService } from './services/discipline.service';
import { DisciplineComponent } from './discipline/discipline.component';
import { TeacherDisciplineComponent } from './teacher-discipline/teacher-discipline.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    NotificationsComponent,
    DisciplineComponent,
    TeacherDisciplineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TeacherService , DisciplineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
