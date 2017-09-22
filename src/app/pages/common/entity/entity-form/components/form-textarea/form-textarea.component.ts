import {Component, ViewContainerRef} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {FieldConfig} from '../../models/field-config.interface';
import {Field} from '../../models/field.interface';
import {TooltipComponent} from '../tooltip/tooltip.component';

@Component({
  selector : 'form-textarea',
  templateUrl : './form-textarea.component.html',
  styleUrls : [ '../dynamic-field/dynamic-field.css' ],
})
export class FormTextareaComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
  fieldShow: string;
}
