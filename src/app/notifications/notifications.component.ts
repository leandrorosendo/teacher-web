import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  public color: any;
  public class: any;
  public text: any;
  public erratrib : boolean;
  //const type = ['','info','success','warning','danger'];
  @Input() message: any;

  constructor() {
    this.class = '';
    this.text = '';
    this.erratrib = false;
  }

  ngOnInit(): void {
 
  }

  ngOnChanges(changes: SimpleChanges) {
 
    if (this.message?.status == 200) {
      this.erratrib = false;
      this.class = 'success';
      this.text = this.message?.mensagem
    }

    if (this.message?.status == 422) {
      this.erratrib = true;
      this.class = 'warning';
      this.text = this.message?.mensagem;
    }

    if (this.message?.status == 403) {
      this.erratrib = false;
      this.class = 'danger';
      this.text = this.message?.erro;
    }
    
    if (this.message?.status == 0) {
      this.erratrib = false;
      this.class = 'danger';
      this.text = 'Http failure response for Server. Server not found.';
    }
  }

}
