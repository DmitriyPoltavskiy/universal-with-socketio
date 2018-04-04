import { Injectable, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { Observable, Subject } from 'rxjs'
// import { HttpService } from '@shared/services/http.service';
import { Router } from '@angular/router';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { CookieStorage } from '@shared/for-storage/browser.storage';

@Injectable()
export class AuthService {
  public signIn$: Subject<any> = new Subject();
  public signUp$: Subject<any> = new Subject();
  public signOut$: Subject<any> = new Subject();

  constructor(
    @Inject(AppStorage) private cookie: CookieStorage,
    // private http: HttpService,
    private router: Router,
  ) {
  }


  signIn(email: string, password: string): Observable<any> {
    console.log('Signin in auth service')
    return Observable.empty(); 
    // this.http.post('/login', {
    //   email: email,
    //   password: password
    // })
    // .do(data => {
    //   console.log('Do Signin in auth service')
    //   if(!('responseCode' in data)) {
    //     this.cookie.setItem('isAuthUser', 'true');
    //     this.user.User = data;
    //     console.log(this.signIn$);
    //     this.signIn$.next('');
    //   }
    // })
  }

  signUp(email: string, password: string, gender: number) {
    return Observable.empty(); 
    // return this.http.post('/register', {
    //   email: email,
    //   gender: gender,
    //   password: password,
    // })
    // .do(data => {
    //   if(!('responseCode' in data)) {
    //     this.cookie.setItem('isAuthUser', 'true');
    //     this.user.User = data;
    //     this.signUp$.next('');
    //   }
    // })
  }

  signOut() {
    // this.http.get('/logout').subscribe(data => {
      this.cookie.removeItem('isAuthUser');
      this.router.navigateByUrl('/');
      this.signOut$.next('');
    // })
  }
}


