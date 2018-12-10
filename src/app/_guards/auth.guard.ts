import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    user : User;

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            return true;
        }        
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

    isAdmin(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(localStorage.getItem('currentUserIsAdmin')){
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}