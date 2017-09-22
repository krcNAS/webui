import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, MdTableModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TreeModule } from 'angular-tree-component';


import { AppLoaderService } from '../../../services/app-loader/app-loader.service';
import { RestService, WebSocketService } from '../../../services/index';
import { Ng2DropdownModule } from 'ng2-material-dropdown';

import { EntityDeleteComponent } from './entity-delete/entity-delete.component';
import { DynamicFieldDirective } from './entity-form/components/dynamic-field/dynamic-field.directive';
import { FormArrayComponent } from './entity-form/components/form-array/form-array.component';
import { FormButtonComponent } from './entity-form/components/form-button/form-button.component';
import { FormCheckboxComponent } from './entity-form/components/form-checkbox/form-checkbox.component';
import { FormInputComponent } from './entity-form/components/form-input/form-input.component';
import { FormUploadComponent } from './entity-form/components/form-upload/form-upload.component';
import { FormSelectComponent } from './entity-form/components/form-select/form-select.component';
import { FormTextareaComponent } from './entity-form/components/form-textarea/form-textarea.component';
import { FormExplorerComponent } from './entity-form/components/form-explorer/form-explorer.component';
import { TooltipComponent } from './entity-form/components/tooltip/tooltip.component';
import { EntityFormComponent } from './entity-form/entity-form.component';
import { EntityTableActionsComponent } from './entity-table/entity-table-actions.component';
import { EntityTableAddActionsComponent } from './entity-table/entity-table-add-actions.component';
import { EntityTableComponent } from './entity-table/entity-table.component';
import { EntityTemplateDirective } from './entity-template.directive';

import { FormPermissionsComponent } from './entity-form/components/form-permissions/form-permissions.component';
import { EntityJobComponent } from './entity-job/entity-job.component';
import { CdkTableModule } from '@angular/cdk';

import { SmdFabSpeedDialTrigger, SmdFabSpeedDialActions, SmdFabSpeedDialComponent} from './fab-speed-dial/fab-speed-dial';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule, NgxDatatableModule, MdTableModule, CdkTableModule, TreeModule,
    Ng2DropdownModule
  ],
  declarations: [
    EntityDeleteComponent,
    EntityTableComponent,
    EntityTableActionsComponent,
    EntityTableAddActionsComponent,
    EntityTemplateDirective,
    DynamicFieldDirective,
    EntityFormComponent,
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormCheckboxComponent,
    FormTextareaComponent,
    FormExplorerComponent,
    FormPermissionsComponent,
    TooltipComponent,
    FormArrayComponent,
    FormUploadComponent,
    EntityJobComponent,
     SmdFabSpeedDialTrigger, SmdFabSpeedDialActions, SmdFabSpeedDialComponent
  ],
  exports: [
    EntityDeleteComponent,
    EntityTemplateDirective,
    EntityFormComponent,
    EntityTableComponent,
    DynamicFieldDirective,
  ],
  entryComponents: [
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormCheckboxComponent,
    FormTextareaComponent,
    FormPermissionsComponent,
    FormArrayComponent,
    FormUploadComponent,
    FormExplorerComponent,
    EntityJobComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AppLoaderService
  ]
})
export class EntityModule {}
