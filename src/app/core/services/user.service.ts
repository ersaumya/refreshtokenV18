import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Login } from '../models/login';
import { Refreshtoken } from '../models/refreshtoken';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public $refreshToken = new Subject<boolean>();
  public $refreshTokenRecieved = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.$refreshToken.subscribe((res: any) => {
      this.getRefreshToken();
    });
  }

  onLogin(obj: any) {
    return this.http.post('https://freeapi.gerasim.in/api/JWT/login', obj);
  }

  getRefreshToken() {
    let loginUserData: any;
    const localData = localStorage.getItem('tokenData');
    if (localData != null) {
      loginUserData = JSON.parse(localData);
    }
    const obj = {
      emailId: localStorage.getItem('tokenDataEmail'),
      token: '',
      refreshToken: loginUserData.refreshToken,
    };
    this.http
      .post('https://freeapi.gerasim.in/api/JWT/refresh', obj)
      .subscribe((res: any) => {
        localStorage.setItem('tokenData', JSON.stringify(res.data));
        this.$refreshTokenRecieved.next(true);
      });
  }

  getUsers() {
    return this.http.get('https://freeapi.gerasim.in/api/JWT/GetAllUsers');
  }
}
