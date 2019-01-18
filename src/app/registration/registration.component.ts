import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  constructor(
    private fb: FormBuilder,
    private api: UserService,
    private router: Router,
    private auth: UserService
  ) {}

  ngOnInit() {
  }

  get f() { return this.registerForm.controls; }

  registerUser() {
    const body = this.registerForm.value;
    this.api.register(body).subscribe((res) => {
      if (this.auth.loggedIn()) {
        this.auth.logout();
      }
      this.router.navigate(['/login']);
    });
  }
}

