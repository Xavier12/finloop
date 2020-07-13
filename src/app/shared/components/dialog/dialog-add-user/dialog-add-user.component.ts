import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/users/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  formNewUser: FormGroup;
  isLoading = false;

  constructor(
    private userService: DataService,
    private dialogRef: MatDialogRef<DialogAddUserComponent>,
    private formBuilder: FormBuilder
  ) { 
    this.formNewUser = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  saveNewUser(): void {
    this.isLoading = true;
    if (this.formNewUser.valid) {
      this.userService.saveUser(this.formNewUser.value)
      .subscribe((response: any) => {
        if (response.id && response.jwt) {
          alert('Usuario guardado exitosamente')
          this.dialogRef.close(true);
        }
        this.isLoading = false;
      }, error => {
        if(error.error.errors[0].code === 1){
          alert('Email previamente registrado.');
        } else {
          alert('Error al guardar');
        }
        this.isLoading = false;
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close()
  }

}
