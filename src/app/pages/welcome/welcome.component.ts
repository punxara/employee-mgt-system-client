import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {DepartmentComponent} from "../department/department.component";
import {EmployeeComponent} from "../employee/employee.component";

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  imports: [
    NzTabSetComponent,
    NzTabComponent,
    DepartmentComponent,
    EmployeeComponent
  ],
  styleUrls: ['./welcome.component.css'],
  styles: [
    `
      [nz-menu] {
        width: 240px;
      }
    `
  ]
})
export class WelcomeComponent {

  constructor(
    protected router: Router
  ) { }

}
