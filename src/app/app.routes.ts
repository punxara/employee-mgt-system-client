import {Routes} from '@angular/router';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {IsLoggedIn} from "./authentication/authentication.guard";
import {DepartmentComponent} from "./pages/department/department.component";
import {EmployeeComponent} from "./pages/employee/employee.component";
import {ActivityLogComponent} from "./pages/activity-log/activity-log.component";

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/authentication'},
  {path: 'welcome', canActivate: [IsLoggedIn], component: WelcomeComponent},
  {path: 'department', canActivate: [IsLoggedIn], component: DepartmentComponent},
  {path: 'employee', canActivate: [IsLoggedIn], component: EmployeeComponent},
  {path: 'activity-log', canActivate: [IsLoggedIn], component: ActivityLogComponent},
  {
    path: 'authentication',
    loadChildren: () => import('../app/authentication/authentication.routes').then(m => m.AUTH_ROUTES)
  },
];
