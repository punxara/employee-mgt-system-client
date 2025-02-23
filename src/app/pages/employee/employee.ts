import {Department} from "../department/department";

export class Employee {
  _id?: string;
  name?: string;
  username?: string;
  password?: string;
  position?: string;
  department?: Department;
  isActive?: boolean;
}
