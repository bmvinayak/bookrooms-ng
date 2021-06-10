import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';


@Component({
	selector: 'bwm-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	registrationForm: any = {};
	errors: BwmApi.Error[] = [];


	constructor(
		private authService: AuthService,
		private router: Router) { }

	ngOnInit() {
	}

	register() {

		const authServiceObserable = this.authService.register(this.registrationForm);
		authServiceObserable.subscribe(
			() => {
				this.router.navigate(
					['/login'],
					{
						queryParams: { Registered: 'Success' }
					});
			},
			(errorResponse) => {
				this.errors = errorResponse;
			});
	}
}
