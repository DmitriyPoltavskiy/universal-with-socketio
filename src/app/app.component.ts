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
