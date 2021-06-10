import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {

	url: string;

	constructor(
		private authService: AuthService,
		private router: Router) { }

/*
	canActivate(next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot) {
			if (this.authService.isAuthenticated) {
				return true;
			}
			this.authService.redirectUrl = state.url;
			this.router.navigate(['login']);
			return false;
		}
*/
	// If user is already logged in and if user is trying to login or register
	// then redirect to default page of the app '/rentals';
	// if user is going to someother page other than login or register then return
	// true so that the user is navigated to the requested page;
	private handleAuthenticatedState(): true | UrlTree {
		if (this.isLoginOrRegisterUrl()) {
			return this.router.parseUrl('/rentals');
		}
		return true;
	}

	// If user is NOT logged in and if user is trying to login or register
	// then return true so that user is take to login or register whichever the user requested
	// if user is going to some other page other than login or register then redirect to
	// login page and captuer user requested url in redirect Url variable;
	private handleNotAuthenticatedState(): true | UrlTree {
		if (this.isLoginOrRegisterUrl()) {
			return true;
		}
		this.authService.redirectUrl = this.url;
		return this.router.parseUrl('/login;Access=Unauthorised');
	}


	private isLoginOrRegisterUrl(): boolean {
		if (this.url.includes('login') || this.url.includes('register')) {
			return true;
		}

		return false;
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): true | UrlTree {

		this.url = state.url;

		if (this.authService.isAuthenticated) {
			return this.handleAuthenticatedState();
		}
		return this.handleNotAuthenticatedState();
	}



}

/*
@Injectable({
	providedIn: 'root',
})
export class GuestGuard implements CanActivate {
	private url: string;

	constructor(private authService: AuthService,
		private router: Router) { }


	canActivate(next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot) {

		if (this.authService.isAuthenticated) {
			this.router.navigate(['/rentals']);
		}

		return true;

	}

}
*/