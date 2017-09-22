import {
  ApplicationRef,
  Component,
  Injector,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { RestService, WebSocketService } from '../../../../services/';
import { FieldConfig } from '../../../common/entity/entity-form/models/field-config.interface';
import {
  matchOtherValidator
} from '../../../common/entity/entity-form/validators/password-validation';

@Component({
  selector: 'system-certificate-import',
  template: `<entity-form [conf]="this"></entity-form>`,
})

export class CertificateImportComponent {

  protected resource_name: string = 'system/certificate/import/';
  protected route_success: string[] = ['system', 'certificates'];
  protected isEntity: boolean = true;
  public fieldConfig: FieldConfig[] = [{
      type: 'input',
      name: 'cert_name',
      placeholder: 'Identifier',
    },
    {
      type: 'textarea',
      name: 'cert_certificate',
      placeholder: 'Certificate',
    },
    {
      type: 'textarea',
      name: 'cert_privatekey',
      placeholder: 'Private Key',
    },
    {
      type: 'input',
      name: 'Passphrase',
      placeholder: 'Passphrase',
      inputType: 'password',
      validation: [matchOtherValidator('Passphrase2')]
    },
    {
      type: 'input',
      name: 'Passphrase2',
      inputType: 'password',
      placeholder: 'Confirm Passphrase',
    },
  ];

  afterInit() { this.route.params.subscribe(params => {}); }

  constructor(protected router: Router, protected route: ActivatedRoute,
    protected rest: RestService, protected ws: WebSocketService,
    protected _injector: Injector, protected _appRef: ApplicationRef) {}
}
