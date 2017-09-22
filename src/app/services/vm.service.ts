import 'rxjs/add/operator/map';

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable, Subject, Subscription} from 'rxjs/Rx';

import {EntityUtils} from '../pages/common/entity/utils'
import {RestService} from './rest.service';
import {WebSocketService} from './ws.service';

@Injectable()
export class VmService {
  protected volume_resource_name: string = 'storage/volume'

  constructor(protected rest: RestService, protected ws: WebSocketService) {};

  getStorageVolumes() { return this.rest.get(this.volume_resource_name, {}); }

  getVM(vm: string) {
    return this.ws.call('vm.query', [[[ "name", "=",  vm ]], {"get": true}])
  }
}
