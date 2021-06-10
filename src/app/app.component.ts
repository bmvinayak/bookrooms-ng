import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/shared/auth.service';

@Component({
	selector: 'bwm-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(
		public auth: AuthService,
		public router: Router) {
	}


	logout = () => {
		this.auth.logout();
		this.router.navigate(['/rentals']);
	}
}
