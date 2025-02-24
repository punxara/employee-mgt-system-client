export class ActivityLog {
  action? : 'create' | 'update' | 'delete';
  empName? : string;
  empUsername? : string;
  empDepartment? : string;
  empPosition? : string;
  date? : Date;
}
