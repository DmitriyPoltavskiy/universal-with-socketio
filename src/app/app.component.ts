import { Component } from '@angular/core';

import { MetaService } from '@ngx-meta/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromPromise';
import { SocketService } from '@shared/services/socket.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(
    private readonly meta: MetaService,
    private socket: SocketService,
  ) {
    this.meta.setTag('og:title', 'home ctor');
  }
}
