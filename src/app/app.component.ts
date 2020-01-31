import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  componentTitle = 'I am from app.component.ts';
  
  clickhandler() {
  alert("I am clicked");
  }
}
