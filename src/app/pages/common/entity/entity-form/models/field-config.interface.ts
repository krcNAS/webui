import {ValidatorFn} from '@angular/forms';
import {RelationGroup} from './field-relation.interface';

export interface FieldConfig {
  disabled?: boolean, label?: string, name: string, options?: any[],
      errors?: string, hasErrors?: boolean, placeholder?: string, type: string,
      inputType?: string, validation?: any[]|ValidatorFn|ValidatorFn[],
      value?: any, multiple?: boolean, tooltip?: string,
      relation?: RelationGroup[], isHidden?: boolean, formarray?: any,
      initialCount?: number, readonly?: boolean, initial?: string
}
