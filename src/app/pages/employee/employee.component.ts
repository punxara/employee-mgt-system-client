import {Component, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {
  NzTableCellDirective,
  NzTableComponent,
  NzTbodyComponent,
  NzTheadComponent,
  NzThMeasureDirective,
  NzTrDirective
} from "ng-zorro-antd/table";
import {Employee} from "./employee";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {EmployeeService} from "./employee.service";
import {EmployeeDraftComponent} from "./employee-draft/employee-draft.component";
import {NzTagComponent} from "ng-zorro-antd/tag";
import {NgIf} from "@angular/common";
import {NzInputDirective} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzColDirective,
    NzDividerComponent,
    NzRowDirective,
    NzTableCellDirective,
    NzTableComponent,
    NzTbodyComponent,
    NzThMeasureDirective,
    NzTheadComponent,
    NzTrDirective,
    NzTagComponent,
    NgIf,
    NzInputDirective,
    FormsModule,
  ],
  providers: [
    NzDrawerService,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = [];
  loading = false;

  _name = '';
  _position = '';
  _department = '';

  constructor(
    private service: EmployeeService,
    private message: NzMessageService,
    private nzDrawerService: NzDrawerService
  ) {
  }

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employees = [];
    this.loading = true;
    let filters: any[] = [];
    if (this._name) {
      filters.push({name: this._name})
    }
    if (this._position) {
      filters.push({position: this._position})
    }
    if (this._department) {
      filters.push({departmentName: this._department})
    }
    this.service.getAll(filters)
      .subscribe(response => {
        this.loading = false;
        this.employees = response.data;
      }, error => {
        this.loading = false;
        this.message.create("error", error.error.message);
      })
  }

  openDrawer(isEdit: boolean, obj: Employee): void {
    const drawerRef = this.nzDrawerService.create<EmployeeDraftComponent>({
      nzTitle: (isEdit && obj) ? 'Edit Employee' : (!isEdit && obj) ? 'Delete Employee' : 'New Employee',
      nzContent: EmployeeDraftComponent,
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
      const index = this.employees.findIndex(i => i._id === $event['response'].data._id);
      const updatedEmployee = {
        ...$event['response'].data,
        department: $event['response'].data.department,
      };
      if (index > -1) {
        Object.assign(this.employees[index], updatedEmployee);
      } else {
        this.employees = [updatedEmployee, ...this.employees];
      }
    } else {
      this.employees = this.employees.filter(i => i._id !== $event['response'].data._id);
    }
  }
}
