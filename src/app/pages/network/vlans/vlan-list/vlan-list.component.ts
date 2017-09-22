import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {RestService} from '../../../../services/rest.service';

@Component({
  selector : 'app-vlan-list',
  template : `<entity-table [conf]="this"></entity-table>`
})
export class VlanListComponent {

  protected resource_name: string = 'network/vlan/';
  protected route_add: string[] = [ 'network', 'vlans', 'add' ];
  protected route_add_tooltip: string = "Add VLAN";
  protected route_edit: string[] = [ 'network', 'vlans', 'edit' ];

  constructor(_rest: RestService, _router: Router) {}

  public columns: Array<any> = [
    {name : 'Vlan Interface', prop : 'vlan_vint'},
    {name : 'Parent Interface', prop : 'vlan_pint'},
    {name : 'Vlan Tag', prop : 'vlan_tag'},
    {name : 'Description', prop : 'vlan_description'},
  ];
  public config: any = {
    paging : true,
    sorting : {columns : this.columns},
  };
}
