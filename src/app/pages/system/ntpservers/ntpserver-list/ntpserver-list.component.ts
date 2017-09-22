import {Component} from '@angular/core';

@Component({
  selector : 'app-ntpserver-list',
  template: `<entity-table [conf]="this"></entity-table>`
})
export class NTPServerListComponent {

  protected resource_name: string = 'system/ntpserver';
  protected route_add: string[] = [ 'system', 'ntpservers', 'add' ];
  protected route_edit: string[] = [ 'system', 'ntpservers', 'edit' ];
  protected route_delete: string[] = [ 'system', 'ntpservers', 'delete' ];
  protected route_success: string[] = [ 'system', 'ntpservers' ];
  
  public columns: Array<any> = [
    {name : 'Address', prop : 'ntp_address'},
    {name : 'Burst', prop : 'ntp_burst'},
    {name : 'IBurst', prop : 'ntp_iburst'},
    {name : 'Prefer', prop : 'ntp_prefer'},
    {name : 'Min. Poll', prop : 'ntp_minpoll'},
    {name : 'Max. Poll', prop : 'ntp_maxpoll'},
  ];
  public config: any = {
    paging : true,
    sorting : {columns : this.columns},
  };
}
