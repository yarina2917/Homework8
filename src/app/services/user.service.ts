import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) { }

  register(body) {
    return this.http.post('https://lectorium.herokuapp.com/api/registration', body);
  }

  login(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post('https://lectorium.herokuapp.com/api/login', body, httpOptions);
  }

  getToken() {
    return this.cookieService.get('token');
  }

  loggedIn() {
    return !!this.getToken();
  }

  logout() {
    this.cookieService.delete('token');
    this.router.navigate(['']);
  }

  get() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-apikey': this.getToken()
      })
    };
    return this.http.get('https://lectorium.herokuapp.com/api/todolist', httpOptions);
  }

  post(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-apikey': this.getToken()
      })
    };
    return this.http.post('https://lectorium.herokuapp.com/api/todolist', body, httpOptions);
  }

  delete(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-apikey': this.getToken()
      })
    };
    return this.http.delete('https://lectorium.herokuapp.com/api/todolist/' + id, httpOptions);
  }

  changeToDo(body, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-apikey': this.getToken()
      })
    };
    return this.http.put('https://lectorium.herokuapp.com/api/todolist/' + id, body, httpOptions);
  }
}
