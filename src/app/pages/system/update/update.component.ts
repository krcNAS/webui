import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { RestService, WebSocketService } from '../../../services/';
import { EntityJobComponent } from '../../common/entity/entity-job/entity-job.component';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
})
export class UpdateComponent implements OnInit {

  public packages: any[] = [];
  public status: string;
  public updating: boolean = false;
  public updated: boolean = false;
  public progress: Object = {};
  public job: any = {};
  public error: string;
  public autoCheck = false;
  public train: string;
  public trains: any[];

  public busy: Subscription;
  public busy2: Subscription;

  constructor(protected router: Router, protected route: ActivatedRoute,
    protected rest: RestService, protected ws: WebSocketService, protected dialog: MdDialog) {}

  ngOnInit() {
    this.busy = this.rest.get('system/update', {}).subscribe((res) => {
      this.autoCheck = res.data.upd_autocheck;
      this.train = res.data.upd_train;
    });
    this.busy2 = this.ws.call('update.get_trains').subscribe((res) => {
      this.trains = [];
      for (let i in res.trains) {
        this.trains.push({ name: i });
      }
      this.train = res.selected;
    })
  }

  toggleAutoCheck() {
    this.busy =
      this.rest
      .put('system/update', { body: JSON.stringify({ upd_autocheck: this.autoCheck }) })
      .subscribe((res) => {
        // verify auto check
      });
  }

  check() {
    this.error = null;
    this.busy =
      this.ws.call('update.check_available', [{ train: this.train }])
      .subscribe(
        (res) => {
          this.status = res.status;
          if (res.status == 'AVAILABLE') {
            this.packages = [];
            res.changes.forEach((item) => {
              if (item.operation == 'upgrade') {
                this.packages.push({
                  operation: 'Upgrade',
                  name: item.old.name + '-' + item.old.version +
                    ' -> ' + item.new.name + '-' +
                    item.new.version,
                });
              } else if (item.operation == 'install') {
                this.packages.push({
                  operation: 'Install',
                  name: item.new.name + '-' + item.new.version,
                });
              } else if (item.operation == 'delete') {
                // FIXME: For some reason new is populated instead of
                // old?
                if (item.old) {
                  this.packages.push({
                    operation: 'Delete',
                    name: item.old.name + '-' + item.old.version,
                  });
                } else if (item.new) {
                  this.packages.push({
                    operation: 'Delete',
                    name: item.new.name + '-' + item.new.version,
                  });
                }
              } else {
                console.error("Unknown operation:", item.operation)
              }
            });
          }
        },
        (err) => { this.error = err.error; });
  }

  update() {
    let dialogRef = this.dialog.open(EntityJobComponent, { data: { "title": "Update" } });
    dialogRef.componentInstance.setCall('update.update', [{ train: this.train, reboot: true }]);
    dialogRef.componentInstance.submit();
  }

}
