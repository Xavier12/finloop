import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { DialogAddUserComponent } from './components/dialog/dialog-add-user/dialog-add-user.component';

@NgModule({
  declarations: [DialogAddUserComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    DialogAddUserComponent
  ]
})
export class SharedModule { }
