import {Component, OnInit} from '@angular/core';
import {NzTableComponent, NzTableModule} from "ng-zorro-antd/table";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {Department} from "./department";
import {DepartmentService} from "./department.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzButtonComponent} from "ng-zorro-antd/button";
import { NzDrawerService} from "ng-zorro-antd/drawer";
import {DepartmentDraftComponent} from "./department-draft/department-draft.component";

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [
    NzTableComponent,
    NzDividerComponent,
    NzRowDirective,
    NzColDirective,
    NzTableModule,
    NzButtonComponent,
  ],providers:[
    NzDrawerService,
  ],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit {

  departments: Department[] = [];
  loading = false;

  constructor(
    private service: DepartmentService,
    private message: NzMessageService,
    // private drawerRef: NzDrawerRef,
    private nzDrawerService: NzDrawerService
  ) {
  }

  ngOnInit() {
    this.departments = [];
    this.loading = true;
    this.service.getAll()
      .subscribe(response => {
        this.loading = false;
        this.departments = response.data;
      }, error => {
        this.loading = false;
        this.message.create("error", error.error.message);
      })
  }

  openDrawer(isEdit: boolean): void {
    const drawerRef = this.nzDrawerService.create<DepartmentDraftComponent>({
      nzTitle: isEdit ? 'Edit Department' : 'Create Department',
      nzContent: DepartmentDraftComponent,
      nzData: {
        isEdit: isEdit
      }
    });

    drawerRef.afterOpen.subscribe(() => {
    });

    drawerRef.afterClose.subscribe(data => {
      console.log(data);
    });
  }
}
