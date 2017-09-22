import {
  ApplicationRef,
  Component,
  Injector,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  FieldConfig
} from '../../../common/entity/entity-form/models/field-config.interface';

import {RestService, WebSocketService} from '../../../../services/';

@Component({
  selector : 'app-device-rawfile-add',
  template : `<device-add [conf]="this"></device-add>`
})

export class DeviceRawFileAddComponent {

  protected resource_name: string = 'vm/device';
  protected pk: any;
  protected route_success: string[];
  public vm: string;
  public fieldConfig: FieldConfig[] = [
    {
      type : 'explorer',
      initial: '/mnt',
      name : 'RAW_path',
      placeholder : 'Raw File',
    },
    {
      type : 'input',
      name : 'RAW_sectorsize',
      placeholder : 'Disk sectorsize',
      inputType : 'number',
    },
    {
      name : 'RAW_mode',
      placeholder : 'Mode',
      type: 'select',
      options : [
        {label : 'AHCI', value : 'AHCI'},
        {label : 'VirtIO', value : 'VIRTIO'},
      ],
    },
  ];
  protected dtype: string = 'RAW';

  afterInit() {
    this.route.params.subscribe(params => {
      this.pk = params['pk'];
      this.vm = params['name'];
      this.route_success = [ 'vm', this.pk, 'devices', this.vm ];
    });
  }

  constructor(protected router: Router, protected route: ActivatedRoute,
              protected rest: RestService, protected ws: WebSocketService,
              protected _injector: Injector, protected _appRef: ApplicationRef,
              ) {}
}
