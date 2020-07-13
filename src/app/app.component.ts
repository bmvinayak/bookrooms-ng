import { Component } from '@angular/core';

@Component({
  selector: 'bwm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  componentTitle = 'I am from app.component.ts';
  
  clickhandler() {
  alert("I am clicked");
  }
}
