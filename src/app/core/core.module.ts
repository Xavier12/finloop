import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/login/login.service'
import { DataService } from './services/users/data.service'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers:[    
    CommonModule,
    LoginService,
    DataService
  ]
})
export class CoreModule { }
