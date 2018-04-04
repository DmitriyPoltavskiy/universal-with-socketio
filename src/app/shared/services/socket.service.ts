import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Observable, Subject, Observer, ReplaySubject, Subscription } from 'rxjs';

import * as io from 'socket.io-client';
import { AuthService } from '@shared/services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class SocketService {
  private host: string = 'https://hasdan.com:8000';
  private socket: SocketIOClient.Socket;
  public socket$: ReplaySubject<SocketIOClient.Socket> = new ReplaySubject();
  public disconnectFromServer$: Subject<any> = new Subject()

  private set Socket(socket: SocketIOClient.Socket) {
    this.socket = socket;
    this.socket$.next(socket);
  }

  private get Socket(): SocketIOClient.Socket {
    return this.socket;
  }

  private socketSubscription: Subscription;
  private enterSubscription: Subscription;
  private signOutSubscription: Subscription;

  constructor(
    private auth: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    if (isPlatformBrowser(this.platformId)) {
      this.initSocket();
    }
  }

  private initSocket() {
    if(this.Socket && this.Socket.connected) {
      this.Socket.close();
    }
    
    if(this.socketSubscription) this.socketSubscription.unsubscribe();
    this.socketSubscription = Observable.create((observer: Observer<any>) => {

      this.Socket = io(`${this.host}?id=11&gender=1`);
      this.Socket.on('connect', () => console.log('SocketIO connected!'));
      this.Socket.on('disconnect', reason => {
        if(reason === 'io server disconnect') {
          this.disconnectFromServer$.next('');
          Observable.timer(1000).subscribe(() => this.Socket.open())
        }
      });
      this.Socket.on('error', (error: string) => {
        console.log(`ERROR: '${error}' (${this.host})`, '!!!!!!!!!!!!!!!');
      });

      if(this.signOutSubscription) this.signOutSubscription.unsubscribe();
      this.signOutSubscription = this.auth.signOut$.subscribe(() => this.initSocket())
    })
    .subscribe()
    
  }

  get SocketID(): string {
    return this.Socket.id;
  }

  connect() {
    this.Socket.connect();
  }

  disconnect() {
    this.Socket.disconnect();
  }

  emit(event:string, message:any) {
    return Observable.create(observer => {
      this.socket$.subscribe(socket => {
        this.Socket.emit(event, message, data => {
          if (data.success) {
            observer.next(data.msg);
          }
          else {
            observer.error(data.msg);
          }
          observer.complete();
        });
      })
    });
  }

  on(eventName) {
    return Observable.create(observer => {
      this.socket$.subscribe(socket => {
        this.Socket.on(eventName, (...data) => {
          observer.next(...data);
        });
      })
    })
  }

  private connected() {
    console.log('Connected');
  }
  
  private disconnected(reason) {
    console.log('Disconnected', reason);
  }
}
