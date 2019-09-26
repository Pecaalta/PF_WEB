import { Component, OnInit, Inject } from '@angular/core';
import { role } from 'src/app/models/role';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (this.data == null) this.data = {
        id: null,
        add_user: false,
        delete_company: false,
        edit_info: false,
        edit_role: false,
        remove_user: false,
        see_role: false,
        end: new Date,
        start: new Date,
      }
    }

  ngOnInit() {
  }
  exit(response): void {
    this.dialogRef.close(response ? this.data : null );
  }
}
