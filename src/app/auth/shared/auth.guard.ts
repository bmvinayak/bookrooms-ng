import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';

import { AuthService }      from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    private url: string;

    constructor(private authService: AuthService, 
                private router: Router) {}
    private handleAuthenticatedState(): true|UrlTree {
        if (this.isLoginOrRegister()) {
            return this.router.parseUrl('/rentals');
        }
        return true;
    }
    private handleNotAuthenticatedState(): true|UrlTree {
        if (this.isLoginOrRegister()) {
            return true;
        }
        this.authService.redirectUrl = this.url;
        return this.router.parseUrl('/login;Access=Unauthorised');
    }
    private isLoginOrRegister(): boolean {
        if (this.url.includes('login') || this.url.includes('register')){
            return true;
        }
    }
    canActivate(next: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot): true|UrlTree {
        this.url = state.url;
        
        if (this.authService.isAuthenticated()) {
            return this.handleAuthenticatedState();
        }
        return this.handleNotAuthenticatedState();
    }


}