import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = 'https://lectorium.herokuapp.com';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) { }

  public register(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(`${this.apiUrl}/api/registration`, body, httpOptions);
  }

  public login(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(`${this.apiUrl}/api/login`, body, httpOptions);
  }

  public getToken(): string {
    return this.cookieService.get('token');
  }

  public loggedIn(): boolean {
    return !!this.getToken();
  }

  public logout(): void {
    this.cookieService.delete('token');
    this.router.navigate(['']);
  }

  public get() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-apikey': this.getToken()
      })
    };
    return this.http.get(`${this.apiUrl}/api/todolist`, httpOptions);
  }

  public post(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-apikey': this.getToken()
      })
    };
    return this.http.post(`${this.apiUrl}/api/todolist`, body, httpOptions);
  }

  public delete(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-apikey': this.getToken()
      })
    };
    return this.http.delete(`${this.apiUrl}/api/todolist/${id}`, httpOptions);
  }

  public changeToDo(body, id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-apikey': this.getToken()
      })
    };
    return this.http.put(`${this.apiUrl}/api/todolist/${id}`, body, httpOptions);
  }
}
