import {Component, Input, OnInit} from '@angular/core';
import {NzFormControlComponent, NzFormDirective} from "ng-zorro-antd/form";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzMessageService} from "ng-zorro-antd/message";
import {Department} from "../department";
import {DepartmentService} from "../department.service";
import {NzDrawerRef} from "ng-zorro-antd/drawer";

@Component({
  selector: 'app-department-draft',
  standalone: true,
  imports: [
    NzFormDirective,
    ReactiveFormsModule,
    NzRowDirective,
    NzColDirective,
    NzFormControlComponent,
    NzInputGroupComponent,
    NzInputDirective,
    NzButtonComponent
  ],
  templateUrl: './department-draft.component.html',
  styleUrl: './department-draft.component.css'
})
export class DepartmentDraftComponent implements OnInit {

  // @ts-ignore
  validateForm: UntypedFormGroup;
  loadingSave = false;
  @Input() isEdit: boolean;
  @Input() obj: Department;

  constructor(
    private untypedFormBuilder: UntypedFormBuilder,
    private message: NzMessageService,
    private service: DepartmentService,
    private drawerRef: NzDrawerRef
  ) {
    this.initForm();
  }

  initForm() {
    this.validateForm = this.untypedFormBuilder.group({
      name: this.untypedFormBuilder.control('', [Validators.required]),
      description: this.untypedFormBuilder.control(''),
    });
  }

  ngOnInit() {
    this.validateForm.reset();
    this.validateForm.setValue({
      name: (this.obj) ? this.obj.name : "",
      description: (this.obj) ? this.obj.description : "",
    });
    if (this.isEdit && this.obj) {
      this.validateForm.controls['name'].disable();
    } else if (!this.isEdit && this.obj) {
      this.validateForm.controls['name'].disable();
      this.validateForm.controls['description'].disable();
    }
  }

  submit() {
    this.loadingSave = true;
    if (this.isEdit && this.obj){
      this.obj.name = this.validateForm.controls['name'].value;
      this.obj.description = this.validateForm.controls['description'].value;
      this.service.update(this.obj)
        .subscribe(response => {
          this.loadingSave = false;
          this.drawerRef.close({response: response, isRemoved: 'N'});
          this.message.create("success", 'Department updated successfully');
        }, error => {
          this.loadingSave = false;
          this.message.create("error", error.error.message);
        })
    } else if (!this.isEdit && !this.obj) {
      this.service.create(this.validateForm.value)
        .subscribe(response => {
          this.loadingSave = false;
          this.drawerRef.close({response: response, isRemoved: 'N'});
          this.message.create("success", 'Department created successfully');
        }, error => {
          this.loadingSave = false;
          this.message.create("error", error.error.message);
        })
    } else if (!this.isEdit && this.obj) {
      this.service.remove(this.obj)
        .subscribe(response => {
          this.loadingSave = false;
          this.drawerRef.close({response: response, isRemoved: 'Y'});
          this.message.create("success", 'Department removed successfully');
        }, error => {
          this.loadingSave = false;
          this.message.create("error", error.error.message);
        })
    }
  }
}
