import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import * as jwt from 'jsonwebtoken';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';


// import 'rxjs/Rx';
import { catchError, map } from 'rxjs/operators';
import { exctractApiError } from 'src/app/common/helpers/functions';

const jwt = new JwtHelperService();

class DecodedToken {
	exp = 0;
	username = '';
}

@Injectable()
export class AuthService {
	private decodedToken: DecodedToken;
	public redirectUrl: string;

	constructor(private http: HttpClient) {
		this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken();
	}

	public register(registrationData: any): Observable<any> {
		return this.http.post('/api/v1/user/register', registrationData);
	}

	public login(loginData: any): Observable<any> {
		return this.http
			.post('/api/v1/user/login', loginData)
			.pipe(
				map((loginResponse: any) => {
					return this.saveToken(loginResponse.access_token);
				}),
				catchError((resError: HttpErrorResponse) =>
					throwError(exctractApiError(resError))
				)
			);
		// .shareReplay();
	}

	public logout() {
		localStorage.removeItem('bwm_auth');
		localStorage.removeItem('bwm_meta');
		this.decodedToken = new DecodedToken();
	}

	public get isAuthenticated(): boolean {
		return moment().isBefore(this.getExpiration());
	}

	private saveToken(token: string): string | null {
		const decodedToken = jwt.decodeToken(token);
		if (!decodedToken) { return null; }
		this.decodedToken = decodedToken;
		localStorage.setItem('bwm_auth', token);
		localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));
		return token;
	}

	private getExpiration() {
		return moment.unix(this.decodedToken.exp);
	}

	public getAuthToken(): string {
		return localStorage.getItem('bwm_auth');
	}
	public get username(): string {
		return this.decodedToken.username;
	}

}


