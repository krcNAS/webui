import { environment } from '../../../../environments/environment';
import {Component, Input} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {Subscription} from 'rxjs';

import {RestService, WebSocketService} from '../../../services/';

@Component({
  selector : 'service',
  templateUrl : './service.component.html',
  styleUrls : [ './service.component.scss' ]
})
export class Service {

  @Input('status') status: any;

  public busy: Subscription;

  constructor(protected router: Router, private rest: RestService,
              private ws: WebSocketService) {}

  toggle() {
    let rpc: string;
    if (this.status.state != 'RUNNING') {
      rpc = 'service.start';
    } else {
      rpc = 'service.stop';
    }

    this.busy = this.ws.call(rpc, [ this.status.service ]).subscribe((res) => {
      if (res) {
        this.status.state = 'RUNNING';
      } else {
        this.status.state = 'STOPPED';
      }
    });
  }

  enableToggle($event: any) {

    this.busy = this.ws
                    .call('service.update',
                          [ this.status.id, {enable : this.status.enable} ])
                    .subscribe((res) => {
                      if (!res) {
                        this.status.enable = !this.status.enable;
                      }
                    });
  }

  editService(service: any) {
    if (service === 'iscsitarget') {
      // iscsi target global config route
      let route = [ 'sharing', 'iscsi' ];
      this.router.navigate(new Array('').concat(route));
    } else if (service === 'netdata') {
      window.open("http://" + environment.remote + "/netdata/#menu_system_submenu_swap;theme=slate");
    } else {
      // Determines the route path
      this.router.navigate(new Array('').concat([ 'services', service ]));
    }
  }
}
