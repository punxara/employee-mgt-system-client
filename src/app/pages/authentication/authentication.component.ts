import {Component, inject} from '@angular/core';
import {NzFormControlComponent, NzFormDirective} from "ng-zorro-antd/form";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {AuthenticationService} from "./authentication.service";
import {response} from "express";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    NzFormDirective,
    ReactiveFormsModule,
    NzRowDirective,
    NzColDirective,
    NzFormControlComponent,
    NzInputGroupComponent,
    NzInputDirective,
    NzButtonComponent,
    NzTypographyComponent
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

  // @ts-ignore
  validateForm: UntypedFormGroup;
  loading = false;

  constructor(
    private untypedFormBuilder: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private message: NzMessageService,
  ) {
    this.initForm();
  }

  initForm() {
    this.validateForm = this.untypedFormBuilder.group({
      username: this.untypedFormBuilder.control('', [Validators.required]),
      password: this.untypedFormBuilder.control('', [Validators.required]),
    });
  }

  logIn(): void {
    if (this.validateForm.valid) {
      this.loading = true;
      this.authenticationService.logIn(this.validateForm.controls['username'].value, this.validateForm.controls['password'].value)
        .subscribe(response => {
          if (response){
            console.log(response)
            // this.message.create("success", "Successfully updated!");
          }
        }, error => {
          this.message.create("error", error.error.message);
        })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
