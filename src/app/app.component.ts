import { Component, PLATFORM_ID, Inject } from '@angular/core';
import * as io from 'socket.io-client';

import { MetaService } from '@ngx-meta/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromPromise';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    if (isPlatformBrowser(this.platformId)) {
      let socket = io(`https://hasdan.com:8000?id=1&gender=1`);

      socket.on('connect', () => console.log('SocketIO connected!'));
      socket.on('disconnect', () => console.log('SocketIO disconnected!'));
    }
  }
}


// import { Injectable } from '@angular/core';
// import { Observable, Subject, Observer, ReplaySubject, Subscription } from 'rxjs';

// import { UserService } from "./user.service";
// import { environment } from 'environments/environment';
// import { AuthService } from '@shared/services/auth.service';

// @Injectable()
// export class SocketService {
//   private host: string = environment.signalServerURL;
//   private socket: SocketIOClient.Socket;
//   public socket$: ReplaySubject<SocketIOClient.Socket> = new ReplaySubject();
//   public disconnectFromServer$: Subject<any> = new Subject()

//   public set Socket(socket: SocketIOClient.Socket) {
//     this.socket = socket;
//     this.socket$.next(socket);
//   }

//   public get Socket(): SocketIOClient.Socket {
//     return this.socket;
//   }

//   private socketSubscription: Subscription;
//   private enterSubscription: Subscription;
//   private signOutSubscription: Subscription;

//   constructor(
//     private user: UserService,
//     private auth: AuthService,
//   ) {

//   }

//   public initSocket() {
//     // console.log('Init socket!');
//     if(this.Socket && this.Socket.connected) {
//       this.Socket.close();
//     }
    
    // if(this.socketSubscription) this.socketSubscription.unsubscribe();
    // this.socketSubscription = Observable.create((observer: Observer<any>) => {
    //   // if(environment.isServer) {
    //   //   console.log('Complete socket observable')
    //   //   observer.complete();
    //   // }
    //   if(!this.user.isLoggedIn()) {
    //     if(this.enterSubscription) this.enterSubscription.unsubscribe();
    //     this.enterSubscription = Observable.merge(this.auth.signIn$, this.auth.signUp$).subscribe(() => this.initSocket())
    //   }
    //   else {
        // this.user.user$.take(1).subscribe(user => {
        //   this.Socket = io(`${this.host}?id=${this.user.User._id}&gender=${this.user.User.gender}`);
        //   this.Socket.on('connect', () => console.log('SocketIO connected!'));
        //   this.Socket.on('disconnect', reason => {
        //     if(reason === 'io server disconnect') {
        //       this.disconnectFromServer$.next('');
        //       Observable.timer(1000).subscribe(() => this.Socket.open())
        //     }
        //   });
        //   this.Socket.on('error', (error: string) => {
        //     console.log(`ERROR: '${error}' (${this.host})`, '!!!!!!!!!!!!!!!');
        //   });
        // })

//     //     if(this.signOutSubscription) this.signOutSubscription.unsubscribe();
//     //     this.signOutSubscription = this.auth.signOut$.subscribe(() => this.initSocket())
//     //   }
//     // })
//     // .subscribe()
    
//   }

//   get SocketID(): string {
//     return this.Socket.id;
//   }

//   connect() {
//     this.Socket.connect();
//   }

//   disconnect() {
//     this.Socket.disconnect();
//   }

//   emit(event:string, message:any) {
//     return Observable.create(observer => {
//       this.socket$.subscribe(socket => {
//         this.Socket.emit(event, message, data => {
//           if (data.success) {
//             observer.next(data.msg);
//           }
//           else {
//             observer.error(data.msg);
//           }
//           observer.complete();
//         });
//       })
//     });
//   }

//   on(eventName) {
//     return Observable.create(observer => {
//       this.socket$.subscribe(socket => {
//         this.Socket.on(eventName, (...data) => {
//           observer.next(...data);
//         });
//       })
//     })
//   }

//   private connected() {
//     console.log('Connected');

//     // this.connectSubject.next(this.socket);
//   }
  
//   private disconnected(reason) {
//     console.log('Disconnected', reason);

//     // if(reason === 'io server disconnect') {
//     //   this.disconnectFromServer$.next('');
//     //   Observable.timer(1000).subscribe(data => this.connect())
//     // }

//   }
// }
