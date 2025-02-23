import { Component } from '@angular/core';
import {NzFormControlComponent, NzFormDirective} from "ng-zorro-antd/form";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {AuthenticationService} from "../../../authentication/authentication.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

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
export class DepartmentDraftComponent {

  // @ts-ignore
  validateForm: UntypedFormGroup;
  loading = false;

  constructor(
    private untypedFormBuilder: UntypedFormBuilder,
    private message: NzMessageService,
  ) {
    this.initForm();
  }

  initForm() {
    this.validateForm = this.untypedFormBuilder.group({
      name: this.untypedFormBuilder.control('', [Validators.required]),
      description: this.untypedFormBuilder.control(''),
    });
  }

  submit(){

  }
}
