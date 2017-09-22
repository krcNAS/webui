import {ApplicationRef, Component, Injector, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import * as _ from 'lodash';
import {Subscription} from 'rxjs';


import {
  IdmapService,
  IscsiService,
  RestService,
  WebSocketService
} from '../../../../services/';
import {
  FieldConfig
} from '../../../common/entity/entity-form/models/field-config.interface';
import {
  matchOtherValidator
} from '../../../common/entity/entity-form/validators/password-validation';

@Component({
  selector : 'snmp-edit',
  template : ` <entity-form [conf]="this"></entity-form>`,
  providers : [ IscsiService, IdmapService ],
})

export class ServiceSNMPComponent {
  protected resource_name: string = 'services/snmp';
  protected route_success: string[] = [ 'services' ];
  public fieldConfig: FieldConfig[] = [
    {
      type : 'input',
      name : 'snmp_location',
      placeholder : 'Location',
      label : 'Location',
      validation : [ Validators.required ]
    },
    {
      type : 'input',
      name : 'snmp_contact',
      placeholder : 'Contact',
    },
    {
      type : 'input',
      name : 'snmp_community',
      placeholder : 'Community',
    },
    {
      type : 'checkbox',
      name : 'snmp_traps',
      placeholder : 'SNMP v3 Support',
    },
    {
      type : 'input',
      name : 'snmp_v3_username',
      placeholder : 'Username',
      relation : [ {
        action : 'DISABLE',
        when : [ {name : 'snmp_traps', value : false} ]
      } ]
    },
    {
      type : 'select',
      name : 'snmp_v3_authtype',
      label : 'Authentic Type',
      options : [
        {label : '---', value : null}, {label : 'MD5', value : 'MD5'},
        {label : 'SHA', value : 'SHA'}
      ],
      relation : [ {
        action : 'DISABLE',
        when : [ {name : 'snmp_traps', value : false} ]
      } ]
    },
    {
      type : 'input',
      name : 'snmp_v3_password',
      inputType : 'password',
      placeholder : 'password',
      validation :
          [ Validators.minLength(8), matchOtherValidator('snmp_v3_password2') ],
      relation : [ {
        action : 'DISABLE',
        when : [ {name : 'snmp_traps', value : false} ]
      } ]
    },
    {
      type : 'input',
      name : 'snmp_v3_password2',
      inputType : 'password',
      placeholder : 'Confirm password',
      relation : [ {
        action : 'DISABLE',
        when : [ {name : 'snmp_traps', value : false} ]
      } ]
    },
    {
      type : 'select',
      name : 'snmp_v3_privproto',
      label : 'Privacy Protocol',
      options : [
        {label : '---', value : null},
        {label : 'AES', value : 'AES'},
        {label : 'DES', value : 'DES'},
      ],
      relation : [ {
        action : 'DISABLE',
        when : [ {name : 'snmp_traps', value : false} ]
      } ]
    },
    {
      type : 'input',
      name : 'snmp_v3_privpassphrase',
      inputType : 'password',
      placeholder : 'Privacy Passphrase',
      validation : [
        Validators.minLength(8), matchOtherValidator('snmp_v3_privpassphrase2')
      ],
      relation : [ {
        action : 'DISABLE',
        when : [ {name : 'snmp_traps', value : false} ]
      } ]
    },
    {
      type : 'input',
      name : 'snmp_v3_privpassphrase2',
      inputType : 'password',
      placeholder : 'Confirm Privacy Passphrase',
      relation : [ {
        action : 'DISABLE',
        when : [ {name : 'snmp_traps', value : false} ]
      } ]
    },
    {
      type : 'textarea',
      name : 'snmp_options',
      placeholder : 'Auxiliary Parameters'
    },
  ];

  ngOnInit() {}

  constructor(protected router: Router, protected route: ActivatedRoute,
              protected rest: RestService, protected ws: WebSocketService,
              protected _injector: Injector, protected _appRef: ApplicationRef,
              protected iscsiService: IscsiService,
              protected idmapService: IdmapService) {}

  afterInit(entityEdit: any) { }
}