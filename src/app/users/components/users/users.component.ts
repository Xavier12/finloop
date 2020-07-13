import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../core/services/login/login.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'
import { DataService } from 'src/app/core/services/users/data.service';
import { DialogAddUserComponent } from 'src/app/shared/components/dialog/dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  form: FormGroup
  displayedColumns: string[] = ['email', 'username'];
  dataSource = new MatTableDataSource();

  constructor(
    private userService: DataService,
    private dialog: MatDialog,
    ) { 

    }

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable(): void {
    this.userService.getUser()
    .subscribe(userList => {
      console.log(userList)
      this.dataSource.data = userList;
    },
    err => {
      console.log(err);
    });
  }

  newUser() {
    const dialogAdd = this.dialog.open(DialogAddUserComponent, {
      data: {
      },
      autoFocus: false,
      width: '500px',
      minHeight: '278px',
      panelClass: 'my-dialog-segments',
    });
    dialogAdd.afterClosed().subscribe((responseAddDialog) => {
      if (responseAddDialog) {
        this.refreshTable();
      }
    });
  }

}
