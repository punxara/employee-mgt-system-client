import {Component, OnInit} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzInputDirective} from "ng-zorro-antd/input";
import {
  NzTableCellDirective,
  NzTableComponent,
  NzTbodyComponent,
  NzTheadComponent,
  NzThMeasureDirective,
  NzTrDirective
} from "ng-zorro-antd/table";
import {NzTagComponent} from "ng-zorro-antd/tag";
import {ReactiveFormsModule} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {ActivityLog} from "./activity-log";
import {ActivityLogService} from "./activity-log.service";
import {NzListComponent, NzListItemComponent} from "ng-zorro-antd/list";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";

@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [
    NgIf,
    NzButtonComponent,
    NzColDirective,
    NzDividerComponent,
    NzInputDirective,
    NzRowDirective,
    NzTableCellDirective,
    NzTableComponent,
    NzTagComponent,
    NzTbodyComponent,
    NzThMeasureDirective,
    NzTheadComponent,
    NzTrDirective,
    ReactiveFormsModule,
    NzListComponent,
    NzListItemComponent,
    DatePipe,
    NzTypographyComponent,
    NzPaginationComponent
  ],
  templateUrl: './activity-log.component.html',
  styleUrl: './activity-log.component.css'
})
export class ActivityLogComponent implements OnInit {

  logs: ActivityLog[] = [];
  loading = false;

  constructor(
    private service: ActivityLogService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit() {
    this.logs = [];
    this.loading = true;
    this.service.getAll()
      .subscribe(response => {
        this.loading = false;
        this.logs = response.data;
      }, error => {
        this.loading = false;
        this.message.create("error", error.error.message);
      })
  }
}
