import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class GuardServiceGuard implements CanActivate {
  private userSubject: BehaviorSubject<User | null>;
  public userDetails$: Observable<User | null>;
  apiUrl: string  = environment.apiUrl ;
  constructor(private http: HttpClient,  private router: Router) {
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse((sessionStorage.getItem('user') || '{}')));
    this.userDetails$ = this.userSubject.asObservable();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
      return  this.userDetails$.pipe(map( user => {
        console.log(user)
      if (user?.user_Id) {
          // authorised so return true
          return true;
      }
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;

     }))
      
 
  }

  login(username: string, password: string) {
    return this.http.post<User>(this.apiUrl + '/users/authenticate', { username, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
}

logout() {
    // remove user from local storage and set current user to null
    sessionStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
}

register(user: User) {
    return this.http.post(this.apiUrl + '/users/register', user);
}
  
}
