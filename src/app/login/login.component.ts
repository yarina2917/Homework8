import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group(({
    name: ['', [Validators.required]],
    password: ['', [Validators.required]]
  }));

  constructor(
    private fb: FormBuilder,
    private api: UserService,
    private router: Router,
    private auth: UserService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    if (this.auth.loggedIn()) {
      this.router.navigate(['/todo']);
    }
  }

  get f() { return this.loginForm.controls; }

  loginUser () {
    const body = this.loginForm.value;
    this.api.login(body).subscribe(res => {
      this.cookieService.set( 'token', res['token'] );
      this.router.navigate(['/todo']);
    });
  }

}
