import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import * as _ from 'lodash';
import {Subscription} from 'rxjs';


import {
  RestService,
  WebSocketService
} from '../../../../services/';
import {
  FieldConfig
} from '../../../common/entity/entity-form/models/field-config.interface';

@Component({
  selector : 'nfs-edit',
  template : ` <entity-form [conf]="this"></entity-form>`,
})

export class ServiceNFSComponent{
  protected resource_name: string = 'services/nfs';
  protected route_success: string[] = [ 'services' ];
  public fieldConfig: FieldConfig[] = [
    {
      type : 'input',
      name : 'nfs_srv_servers',
      placeholder : 'Number of servers:',
    },
    {
      type : 'checkbox',
      name : 'nfs_srv_udp',
      placeholder : 'Serve UDP NFS clients:',
    },
    {
      type : 'select',
      name : 'nfs_srv_bindip',
      placeholder : 'Bind IP Addresses:',
      options : [],
      multiple : true
    },
    {
      type : 'checkbox',
      name : 'nfs_srv_allow_nonroot',
      placeholder : 'Allow non-root mount:',
    },
    {
      type : 'checkbox',
      name : 'nfs_srv_v4',
      placeholder : 'Enable NFSv4:',
    },
    {
      type : 'checkbox',
      name : 'nfs_srv_v4_v3owner',
      placeholder : 'NFSv3 ownership model for NFSv4:',
      relation : [
        {
          action : 'DISABLE',
          when : [ {
            name : 'nfs_srv_16',
            value : true,
          } ]
        },
      ],
    },
    {
      type : 'checkbox',
      name : 'nfs_srv_v4_krb',
      placeholder : 'Require Kerberos for NFSv4:',
    },
    {
      type : 'input',
      name : 'nfs_srv_mountd_port',
      placeholder : 'mountd(8) bind port:',
    },
    {
      type : 'input',
      name : 'nfs_srv_rpcstatd_port',
      placeholder : 'rpc.statd(8) bind port:',
    },
    {
      type : 'input',
      name : 'nfs_srv_rpclockd_port',
      placeholder : 'rpc.lockd(8) bind port:',
    },
    {
      type : 'checkbox',
      name : 'nfs_srv_16',
      placeholder : 'Support >16 groups:',
    },
    {
      type : 'checkbox',
      name : 'nfs_srv_mountd_log',
      placeholder : 'Log mountd(8) requests:',
    },
    {
      type : 'checkbox',
      name : 'nfs_srv_statd_lockd_log',
      placeholder : 'Log rpc.statd(8) and rpc.lockd(8)',
    },
  ];

  private nfs_srv_bindip: any;
  constructor(protected router: Router, protected route: ActivatedRoute,
              protected rest: RestService, protected ws: WebSocketService,
              ) {}

  afterInit(entityForm: any) {
    this.ws.call('notifier.choices', [ 'IPChoices' ]).subscribe((res) => {
      this.nfs_srv_bindip = _.find(this.fieldConfig, {name : 'nfs_srv_bindip'});
      for (let item of res) {
        this.nfs_srv_bindip.options.push({label: item[0], value: item[1]});
      }
    });
  }

}
