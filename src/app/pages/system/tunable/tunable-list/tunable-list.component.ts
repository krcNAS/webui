import { ApplicationRef, Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { RestService, WebSocketService } from '../../../../services/';

@Component({
  selector: 'system-tunables-list',
  template: `<entity-table [conf]="this"></entity-table>`
})

export class TunableListComponent {

  protected resource_name: string = 'system/tunable';
  protected route_delete: string[] = ['system', 'tunable', 'delete'];
  protected route_edit: string[] = ['system', 'tunable', 'edit'];
  protected route_success: string[] = [ 'system', 'tunable' ];

  public busy: Subscription;
  public sub: Subscription;

  constructor(protected router: Router, protected aroute: ActivatedRoute,
    protected rest: RestService, protected ws: WebSocketService,
    protected _injector: Injector, protected _appRef: ApplicationRef) {}

  public columns: Array < any > = [
    { name: 'Variable', prop: 'tun_var' },
    { name: 'Value', prop: 'tun_value' },
    { name: 'Type', prop: 'tun_type' },
    { name: 'Comment', prop: 'tun_comment' },
    { name: 'Enable', prop: 'tun_enabled' },
  ];

  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
  }

  getAddActions() {
    let actions = [];
    actions.push({
      label: "Add Tunable",
      icon: "fiber_new",
      onClick: () => {
        this.router.navigate(
          new Array('').concat(["system", "tunable", "add"]));
      }
    }, );

    return actions;
  }

  preInit(entityList: any) {
    this.sub = this.aroute.params.subscribe(params => {});
  }
}
