import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  onLogin(obj: any) {
    return this.http.post('https://freeapi.gerasim.in/api/JWT/login', obj);
  }

  getUsers() {
    return this.http.get('https://freeapi.gerasim.in/api/JWT/GetAllUsers');
  }
}
