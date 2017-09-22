import 'rxjs/add/operator/map';

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable, Subject, Subscription} from 'rxjs/Rx';

import {RestService} from './rest.service';
import {WebSocketService} from './ws.service';

@Injectable()
export class SystemGeneralService {

  protected certificateList: string = 'system/certificate';

  constructor(protected rest: RestService, protected ws: WebSocketService) {};

  getCA() { return this.ws.call('certificateauthority.query', []); }

  getCertificates() { return this.rest.get(this.certificateList, {}); }

  getIPChoices() {
    return this.ws.call('notifier.choices', [ 'IPChoices', [ true, false ] ]);
  }
}