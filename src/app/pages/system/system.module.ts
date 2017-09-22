import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgUploaderModule } from 'ngx-uploader';

import { EntityModule } from '../common/entity/entity.module';

import { MaterialModule } from '@angular/material';
import { routing } from './system.routing';

import { GeneralComponent } from './general/general.component';
import { ConfigSaveComponent } from './general/config-save/config-save.component';
import { ConfigUploadComponent } from './general/config-upload/config-upload.component';
import { ConfigResetComponent } from './general/config-reset/config-reset.component';
import { AdvancedComponent } from './advanced/';
import { BootEnvironmentCloneComponent } from './bootenv/bootenv-clone/';
import { BootEnvironmentListComponent } from './bootenv/bootenv-list/';
import { TunableListComponent } from './tunable/tunable-list/';
import { TunableFormComponent } from './tunable/tunable-form/';
import { UpdateComponent } from './update/';
import { NTPServerAddComponent } from './ntpservers/ntpserver-add/';
import { NTPServerEditComponent } from './ntpservers/ntpserver-edit/';
import { NTPServerListComponent } from './ntpservers/ntpserver-list/';
import { CertificateAuthorityImportComponent } from './ca/ca-import/';
import { CertificateAuthorityIntermediateComponent } from './ca/ca-intermediate/';
import { CertificateAuthorityInternalComponent } from './ca/ca-internal/';
import { CertificateAuthorityListComponent } from './ca/ca-list/';
import { CAFormComponent } from './ca/ca-form/';
import { CertificateCSRComponent } from './certificates/certificate-csr/';
import { CertificateEditComponent } from './certificates/certificate-edit/';
import { CertificateImportComponent } from './certificates/certificate-import/';
import { CertificateInternalComponent } from './certificates/certificate-internal/';
import { CertificateListComponent } from './certificates/certificate-list';
import { SupportComponent } from './support/support.component';

@NgModule({
  imports: [
    EntityModule, CommonModule, FormsModule,
    ReactiveFormsModule, NgUploaderModule, routing,
    MaterialModule
  ],
  declarations: [
    GeneralComponent,
    ConfigUploadComponent,
    ConfigResetComponent,
    ConfigSaveComponent,
    AdvancedComponent,
    BootEnvironmentListComponent,
    BootEnvironmentCloneComponent,
    TunableListComponent,
    TunableFormComponent,
    UpdateComponent,
    NTPServerListComponent,
    NTPServerAddComponent,
    NTPServerEditComponent,
    CAFormComponent,
    CertificateAuthorityListComponent,
    CertificateAuthorityImportComponent,
    CertificateAuthorityInternalComponent,
    CertificateAuthorityIntermediateComponent,
    CertificateListComponent,
    CertificateEditComponent,
    CertificateImportComponent,
    CertificateInternalComponent,
    CertificateCSRComponent,
    SupportComponent
  ],
  providers: []
})
export class SystemModule {}
