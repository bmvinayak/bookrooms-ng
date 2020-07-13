import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
//import * as jwt from 'jsonwebtoken';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';


//import 'rxjs/Rx';
import { map } from "rxjs/operators";

const jwt = new JwtHelperService();

class DecodedToken {
	exp: number = 0;
	username: string = '';
}
@Injectable()

export class AuthService{
	private decodedToken;
	public redirectUrl: string;
	constructor(private http: HttpClient) {
		this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken;
	}

	private saveToken(token: string): string {
		this.decodedToken = jwt.decodeToken(token);
		localStorage.setItem('bwm_auth', token);
		localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));
		return token;
	}

	private getExpiration() {
		return moment.unix(this.decodedToken.exp);
	}
	public register(registrationData: any): Observable<any> {
		return this.http.post("/api/v1/user/register", registrationData);
    }

	public login(loginData: any): Observable<any> {
		return this.http.post('/api/v1/user/login', loginData).pipe(map(
			(token: string) => {
				return this.saveToken(token);
			}
		));
		//.shareReplay();
	}
	
	public logout() {
		localStorage.removeItem('bwm_auth');
		localStorage.removeItem('bwm_meta');
		this.decodedToken = new DecodedToken;
	}
	public isAuthenticated(): boolean {
		return moment().isBefore(this.getExpiration())
	}

	public getAuthToken(): string {
		return localStorage.getItem('bwm_auth');
	}
	public getUserName(): string {
		return this.decodedToken.username;
	}

}


