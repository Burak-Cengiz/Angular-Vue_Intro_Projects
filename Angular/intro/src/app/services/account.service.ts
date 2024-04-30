import { Injectable, OnInit } from '@angular/core';
import { User } from '../login/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor() {}
  login(user: User): boolean {
    if (user.userName == 'burak' && user.password == '12345') {
      localStorage.setItem('isLogged', JSON.stringify(user));
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    const savedUser = localStorage.getItem('isLogged');
    return savedUser
      ? JSON.parse(savedUser).userName === 'burak' &&
          JSON.parse(savedUser).password === '12345'
      : false;
  }

  logOut() {
    localStorage.removeItem('isLogged');
  }
}
