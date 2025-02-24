import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {DepartmentComponent} from "../department/department.component";
import {EmployeeComponent} from "../employee/employee.component";
import {ActivityLogComponent} from "../activity-log/activity-log.component";
import {NzResultComponent} from "ng-zorro-antd/result";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzMessageService} from "ng-zorro-antd/message";
import {Employee} from "../employee/employee";
import {EmployeeService} from "../employee/employee.service";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  imports: [
    NzTabSetComponent,
    NzTabComponent,
    DepartmentComponent,
    EmployeeComponent,
    ActivityLogComponent,
    NzResultComponent,
    NzButtonComponent,
    NzRowDirective,
    NzColDirective,
  ],
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  private IS_LOGGED_IN = 'IS_LOGGED_IN';
  private LOGGED_EMP_ID = 'LOGGED_EMP_ID';
  loading = false;

  constructor(
    private message: NzMessageService,
    private router: Router,
    private employeeService: EmployeeService,
  ) {
  }

  logout() {
    this.loading = true;
    let loggedEmp = new Employee();
    loggedEmp._id = localStorage.getItem('LOGGED_EMP_ID');
    loggedEmp.isActive = false;
    this.employeeService.update(loggedEmp)
      .subscribe(response => {
        this.loading = false;
        localStorage.setItem(this.IS_LOGGED_IN, 'N');
        localStorage.setItem(this.LOGGED_EMP_ID, '');
        this.router.navigate(['']);
        console.log(`Employee : ${response.data.name} logged out.`)
      }, error => {
        this.loading = false;
        this.message.create("error", error.error.message);
      })
  }
}
