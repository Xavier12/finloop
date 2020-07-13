import { Component, OnInit } from '@angular/core';
import { LoginService } from '../core/services/login/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: LoginService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['carrera@gmail.com', [Validators.required]],
      password: ['123456', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  login(event: Event) {
    event.preventDefault();
    this.authenticationService.login(this.form.value)
    .subscribe((response: any) => {
      if (response) {
        this.router.navigate(['/users']);
      } else {
        alert('Error al identificarse');
      }
    });
  }

}
