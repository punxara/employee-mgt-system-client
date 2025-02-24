import {Component, Input, OnInit} from '@angular/core';
import {NzFormControlComponent, NzFormDirective} from "ng-zorro-antd/form";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {Employee} from "../employee";
import {EmployeeService} from "../employee.service";
import {DepartmentService} from "../../department/department.service";
import {response} from "express";
import {Department} from "../../department/department";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-employee-draft',
  standalone: true,
  imports: [
    NzFormDirective,
    ReactiveFormsModule,
    NzRowDirective,
    NzColDirective,
    NzFormControlComponent,
    NzInputDirective,
    NzButtonComponent,
    NzSelectComponent,
    NzOptionComponent,
    NgForOf
  ],
  templateUrl: './employee-draft.component.html',
  styleUrl: './employee-draft.component.css'
})
export class EmployeeDraftComponent implements OnInit {

  validateForm: UntypedFormGroup;
  loadingSave = false;
  loading = false;
  @Input() isEdit: boolean;
  @Input() obj: Employee;
  departments: Department[] = [];

  constructor(
    private untypedFormBuilder: UntypedFormBuilder,
    private message: NzMessageService,
    private service: EmployeeService,
    private departmentService: DepartmentService,
    private drawerRef: NzDrawerRef
  ) {
    this.initForm();
  }

  initForm() {
    this.validateForm = this.untypedFormBuilder.group({
      name: this.untypedFormBuilder.control('', [Validators.required]),
      username: this.untypedFormBuilder.control('', [Validators.required]),
      password: this.untypedFormBuilder.control('', [Validators.required]),
      position: this.untypedFormBuilder.control('', [Validators.required]),
      department: this.untypedFormBuilder.control('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.loading = true;
    this.departmentService.getAll()
      .subscribe(response => {
        this.loading = false;
        this.departments = response.data;
        this.setDefaultValues();
      }, error => {
        this.loading = false;
        this.message.create("error", error.error.message);
      })
  }

  setDefaultValues() {
    this.validateForm.reset();
    this.validateForm.setValue({
      name: (this.obj) ? this.obj.name : "",
      username: (this.obj) ? this.obj.username : "",
      password: (this.obj) ? this.obj.password : "",
      position: (this.obj) ? this.obj.position : "",
      department: (this.obj) ? this.departments.find(dpt => dpt._id === this.obj?.department?._id).name : "",
    });
    if (this.isEdit && this.obj) {
      this.validateForm.controls['username'].disable();
      this.validateForm.controls['password'].disable();
    } else if (!this.isEdit && this.obj) {
      this.validateForm.controls['name'].disable();
      this.validateForm.controls['username'].disable();
      this.validateForm.controls['password'].disable();
      this.validateForm.controls['position'].disable();
      this.validateForm.controls['department'].disable();
    }
  }


  submit() {
    this.loadingSave = true;
    if (this.isEdit && this.obj) {
      this.obj.name = this.validateForm.controls['name'].value;
      this.obj.username = this.validateForm.controls['username'].value;
      this.obj.password = this.validateForm.controls['password'].value;
      this.obj.position = this.validateForm.controls['position'].value;
      this.obj.department = this.departments.find(dpt => dpt.name === this.validateForm.controls['department'].value);
      this.service.update(this.obj)
        .subscribe(response => {
          this.loadingSave = false;
          this.drawerRef.close({response: response, isRemoved: 'N'});
          this.message.create("success", 'Employee updated successfully');
        }, error => {
          this.loadingSave = false;
          this.message.create("error", error.error.message);
        })
    } else if (!this.isEdit && !this.obj) {
      let empToSave: Employee = this.validateForm.value;
      empToSave.department = this.departments.find(dpt => dpt.name === this.validateForm.controls['department'].value);
      this.service.create(empToSave)
        .subscribe(response => {
          this.loadingSave = false;
          this.drawerRef.close({response: response, isRemoved: 'N'});
          this.message.create("success", 'Employee created successfully');
        }, error => {
          this.loadingSave = false;
          this.message.create("error", error.error.message);
        })
    } else if (!this.isEdit && this.obj) {
      this.service.remove(this.obj)
        .subscribe(response => {
          this.loadingSave = false;
          this.drawerRef.close({response: response, isRemoved: 'Y'});
          this.message.create("success", 'Employee removed successfully');
        }, error => {
          this.loadingSave = false;
          this.message.create("error", error.error.message);
        })
    }
  }
}
