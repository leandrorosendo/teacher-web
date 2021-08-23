import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public step: any;

  constructor() {
    this.step = '';
  }

  ngOnInit(): void {
    this.step = "";
  }

  editClass(step : any ){
    this.step = step;
  }


}
