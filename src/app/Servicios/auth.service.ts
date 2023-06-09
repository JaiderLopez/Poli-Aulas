import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import * as CryptoJS from 'crypto-js';  

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private local: LocalStorageService, private session: SessionStorageService) { }

  user = 'cyrPXjQmiRqg/r+SQuGupQ==';
  pass = 'eHFbmumwF/F3vcF+oCNdCA==';
  name = 'E9XNbHMsSy6gmieYW0CLlA==';

  public isAuthenticated(): boolean {
    const user = this.session.get(this.user);
    const pass = this.session.get(this.pass);
    if (user != null && pass != null) {
      return true;
    }
    return false;
  }

  public logout(): void {
    this.session.clear();
  }

  public getUser(): string {
    return this.session.get(this.user);
  }

  public getPass(): string {
    return this.session.get(this.pass);
  }

  public getName(): string {
    return this.session.get(this.name);
  }

  public login(user: string, pass: string, name: string): void {
    this.session.set(this.user, user, 1800, 's');
    this.session.set(this.pass, pass, 1800, 's');
    this.session.set(this.name, name, 1800, 's');
  }
}
