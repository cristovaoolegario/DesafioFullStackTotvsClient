import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<User>(`${config.apiUrl}/users`, { username, password })
            .pipe(map(user => {                
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                if(user.isadmin){
                    localStorage.setItem('currentUserIsAdmin', JSON.stringify(user.isadmin));
                }

                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserIsAdmin');
    }
}