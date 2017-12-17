import { Injectable } from '@angular/core';

@Injectable()
export class SessionManagerService {

  constructor() { }

  public getToken<T>(): T {
      return JSON.parse(window.sessionStorage.getItem('token'));
  }

  public setToken<T>(token: T): void {
    window.sessionStorage.setItem('token', JSON.stringify(token));
  }

  public deleteToken(): void {
      window.sessionStorage.clear();
  }

}
