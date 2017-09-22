import { ApplicationRef, Component, Injector, OnInit, Inject, NgZone, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, Validator } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgFileSelectDirective, NgUploaderOptions, UploadedFile } from 'ngx-uploader';
import { Observable, Observer, Subscription } from 'rxjs';
import { WebSocketService } from '../../../../services/';
import { EntityJobComponent } from '../../../common/entity/entity-job/entity-job.component';

@Component({
  selector: 'config-upload',
  templateUrl: './config-upload.component.html'
})

export class ConfigUploadComponent {
  public options: NgUploaderOptions;
  public busy: Subscription[] = [];
  public sub: Subscription;
  public observer: Observer < any > ;
  public jobId: Number;
  @ViewChild(NgFileSelectDirective) file: NgFileSelectDirective;

  constructor(@Inject(NgZone) private zone: NgZone,
    protected ws: WebSocketService) {
    this.options = new NgUploaderOptions({
      url: '/_upload',
      data: {
        data: JSON.stringify({
          method: 'config.upload',
        }),
      },
      autoUpload: true,
      calculateSpeed: true,
      customHeaders: {
        Authorization: 'Basic ' + btoa(ws.username + ':' + ws.password),
      }
    });
  }

  handleUpload(ufile: UploadedFile) {
    if (ufile.done) {
      let resp = JSON.parse(ufile.response);
      this.jobId = resp.job_id;
      this.observer.complete();
    }
  }

  doSubmit($event) {
    this.sub = Observable
                   .create((observer) => {
                     this.observer = observer;
                     this.file.uploader.uploadFilesInQueue();
                   })
                   .subscribe();
    this.busy.push(this.sub);
  }
}
