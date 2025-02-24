import {Component} from '@angular/core';
import {NzFormControlComponent, NzFormDirective} from "ng-zorro-antd/form";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {EmployeeService} from "../pages/employee/employee.service";
import {Employee} from "../pages/employee/employee";

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
  loadingSave = false;
  private IS_LOGGED_IN = 'IS_LOGGED_IN';

  constructor(
    private untypedFormBuilder: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private message: NzMessageService,
    private router: Router,
    private employeeService: EmployeeService,
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
          this.loading = false;
          if (!!response?.status) {
            this.message.create("success", "Logged in successfully!");
            this.updateEmployeeStatus(response.data)
            localStorage.setItem(this.IS_LOGGED_IN, 'Y');
            this.router.navigate([`/welcome`]);
          } else {
            this.message.create("error", "Login failed.");
          }
        }, error => {
          this.loading = false;
          this.message.create("error", error.error.message);
        })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  updateEmployeeStatus(emp: Employee) {
    this.loadingSave = true;
    emp.isActive = true;
    this.employeeService.update(emp)
      .subscribe(response => {
        this.loadingSave = false;
        console.log(`Employee : ${response.data.name} logged in.`)
      }, error => {
        this.loadingSave = false;
        this.message.create("error", error.error.message);
      })
  }
}
