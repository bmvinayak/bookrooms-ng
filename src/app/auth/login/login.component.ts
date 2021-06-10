import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'bwm-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

	loginForm: FormGroup;
	errors: BwmApi.Error[] = [];
	emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	registerMessage = '';
	accessMessage = '';
	messageTimeout: number;
	replaceParams: object;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private activateRoute: ActivatedRoute) { }

	ngOnInit() {
		this.initForm();
		this.checkLoginMessage();
	}

	checkLoginMessage() {
		this.activateRoute.queryParams.subscribe(
			(params) => {
				if (params['Registered'] === 'Success') {
					this.registerMessage = 'You have been successfully registered. You may login now!!!';
					this.replaceParams = { Registered: null };
				}
				if (params['Access'] === 'Unauthorised') {
					this.accessMessage = 'Could not authenticate or session expired. Please re-login!!!';
					this.replaceParams = { Access: null };
				}

				this.messageTimeout = window.setTimeout(() => {
					this.router.navigate([], {
						replaceUrl: true,
						queryParams: this.replaceParams,
						queryParamsHandling: 'merge'
					});

					this.registerMessage = '';
					this.accessMessage = '';
			}, 4000);
		});
	}

	ngOnDestroy() {
		if (this.messageTimeout) {
			window.clearTimeout(this.messageTimeout);
		}
	}

	initForm() {
		this.loginForm = this.fb.group({
			email: ['',
				[
					Validators.required,
					Validators.pattern(this.emailPattern)
				]
			],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	isValidInput(fieldName): boolean {
		return this.loginForm.controls[fieldName].invalid &&
			(this.loginForm.controls[fieldName].dirty
				|| this.loginForm.controls[fieldName].touched);

	}

	isRequired(fieldName): boolean {
		return this.loginForm.controls[fieldName].errors.required;
	}

	login() {
		const authServiceObserable = this.authService.login(this.loginForm.value);
		authServiceObserable.subscribe(
			(_: string) => {
				if (this.authService.redirectUrl) {
					this.router.navigate([this.authService.redirectUrl]);
					this.authService.redirectUrl = null;
				} else {
					this.router.navigate(['/rentals']);
				}
			},
			(errorResponse: BwmApi.Error[]) => {
				this.errors = errorResponse;
			});
	}
}
