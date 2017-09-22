import {Component} from '@angular/core';
import {Router} from '@angular/router';
import * as _ from 'lodash';

import {
  NetworkService,
  RestService,
  WebSocketService
} from '../../../../services/';
import {
  FieldConfig
} from '../../../common/entity/entity-form/models/field-config.interface';

@Component({
  selector : 'app-vlan-form',
  template : `<entity-form [conf]="this"></entity-form>`
})
export class VlanFormComponent {

  protected resource_name: string = 'network/vlan/';
  protected route_success: string[] = [ 'network', 'vlans' ];
  protected isEntity: boolean = true;

  public fieldConfig: FieldConfig[] = [
    {
      type : 'input',
      name : 'vlan_vint',
      placeholder : 'Virtual Interface',
    },
    {
      type : 'select',
      name : 'vlan_pint',
      placeholder : 'Parent Interface',
      options : []
    },
    {
      type : 'input',
      name : 'vlan_tag',
      placeholder : 'Vlan Tag',
    },
    {
      type : 'input',
      name : 'vlan_description',
      placeholder : 'Description',
    },
  ];

  private vlan_pint: any;

  constructor(protected router: Router, protected rest: RestService,
              protected ws: WebSocketService,
              protected networkService: NetworkService) {}

  afterInit(entityForm: any) {
    this.networkService.getVlanNicChoices().subscribe((res) => {
      this.vlan_pint = _.find(this.fieldConfig, {'name' : 'vlan_pint'});
      res.forEach((item) => {
        this.vlan_pint.options.push({label : item[1], value : item[0]});
      });
    });

    if (!entityForm.isNew) {
      entityForm.setDisabled('vlan_vint', true);
    }
  }
}
