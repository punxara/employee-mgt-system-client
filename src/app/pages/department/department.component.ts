import {Component, OnInit} from '@angular/core';
import {NzTableComponent, NzTableModule} from "ng-zorro-antd/table";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {Department} from "./department";
import {DepartmentService} from "./department.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {DepartmentDraftComponent} from "./department-draft/department-draft.component";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";

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
    NzTypographyComponent,
    NzPaginationComponent,
  ],
  providers: [
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

  openDrawer(isEdit: boolean, obj: Department): void {
    const drawerRef = this.nzDrawerService.create<DepartmentDraftComponent>({
      nzTitle: (isEdit && obj) ? 'Edit Department' : (!isEdit && obj) ? 'Delete Department' : 'New Department',
      nzContent: DepartmentDraftComponent,
      nzData: {
        isEdit: isEdit,
        obj: obj
      }
    });

    drawerRef.afterOpen.subscribe(() => {
    });

    drawerRef.afterClose.subscribe(data => {
      this.updateTable(data);
    });
  }

  updateTable($event) {
    if ($event['isRemoved'] === 'N') {
      const index = this.departments.findIndex(i => i._id === $event['response'].data._id);
      if (index > -1) {
        Object.assign(this.departments[index], $event['response'].data);
      } else {
        this.departments = [$event['response'].data, ...this.departments];
      }
    } else {
      this.departments = this.departments.filter(i => i._id !== $event['response'].data._id);
    }
  }
}
