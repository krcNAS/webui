import {Location} from '@angular/common';
import {
  ApplicationRef,
  Component,
  ContentChildren,
  Injector,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChildren
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {
  FieldConfig
} from '../../../common/entity/entity-form/models/field-config.interface';
import * as _ from 'lodash';
import {Subscription} from 'rxjs';
import {EntityFormService} from '../../../../pages/common/entity/entity-form/services/entity-form.service';


import {RestService, WebSocketService} from '../../../../services/';
import {EntityUtils} from '../../../common/entity/utils';
import {EntityTemplateDirective} from '../../../common/entity/entity-template.directive';

@Component({
  selector : 'device-add',
  templateUrl : '../../../common/entity/entity-form/entity-form.component.html',
  styleUrls : [ '../../../common/entity/entity-form/entity-form.component.scss' ]
})
export class DeviceAddComponent implements OnInit {

  @Input('conf') conf: any;

  public formGroup: FormGroup;
  public fieldConfig: FieldConfig[];
  public error: string;
  public data: Object = {};
  public vmid: any;
  protected route_cancel: string[];
  protected route_success: string[];
  public hasConf: boolean = true;
  public success: boolean = false;

  templateTop: TemplateRef<any>;
  @ContentChildren(EntityTemplateDirective)
  templates: QueryList<EntityTemplateDirective>;

  @ViewChildren('component') components;

  public busy: Subscription;

  constructor(protected router: Router, protected rest: RestService,
              protected ws: WebSocketService, protected entityFormService: EntityFormService,
              protected _injector: Injector, protected _appRef: ApplicationRef,
              private location: Location) {}

  ngOnInit() {
    this.fieldConfig = this.conf.fieldConfig;
    this.formGroup = this.entityFormService.createFormGroup(this.fieldConfig);
    this.conf.afterInit(this);

  }

  goBack() { this.location.back(); }
  
  isShow(id: any): any {
    if (this.conf.isBasicMode) {
      if (this.conf.advanced_field.indexOf(id) > -1) {
        return false;
      }
    }
    return true;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.ws.call('vm.query', [[[ "name", "=", this.conf.vm ]]]).subscribe((res) => {
      let formvalue = _.cloneDeep(this.formGroup.value);
      this.route_success = [ 'vm', this.vmid, 'devices', this.conf.vm ];
      this.route_cancel = [ 'vm', this.vmid, 'devices', this.conf.vm ];
      this.error = null;
      let payload = {};
      let devices = [];
      if (this.conf.dtype === 'NIC') {
        devices.push({
          "dtype" : 'NIC',
          "attributes" :
              { "type" : formvalue.NIC_type, "mac" : formvalue.NIC_mac, "nic_attach": formvalue.nic_attach }
        })
      }
      if (this.conf.dtype === 'VNC') {
        devices.push({
          "dtype" : 'VNC',
          "attributes" : {
            "wait" : formvalue.VNC_wait,
            "vnc_port" : formvalue.VNC_port,
            "vnc_resolution" : formvalue.VNC_resolution,
            "vnc_bind": formvalue.vnc_bind,
            "vnc_password": formvalue.vnc_password
          }
        })
      }
      if (this.conf.dtype === 'DISK') {
        devices.push({
          "dtype" : 'DISK',
          "attributes" :
              { "type" : formvalue.DISK_mode, "path" : formvalue.DISK_zvol, "sectorsize":formvalue.sectorsize }
        })
      }
      if (this.conf.dtype === 'CDROM') {
        devices.push({
          "dtype" : 'CDROM',
          "attributes" : {"path" : formvalue['path']}
        })
      }
      if (this.conf.dtype === 'RAW') {
        devices.push({
          "dtype" : 'RAW',
          "attributes" :
              {
                "type" : formvalue.RAW_mode, "path" : formvalue.RAW_path,
                "sectorsize":formvalue.RAW_sectorsize
              }
        })
      }

      payload['devices'] = devices;
      this.busy =
          this.ws.call('vm.create_device', [ this.conf.pk, payload ])
              .subscribe(
                  (res) => {
                    this.router.navigate(
                        new Array('').concat(this.conf.route_success));
                  },
                  (res) => { new EntityUtils().handleError(this, res); });
    });
  }
}
