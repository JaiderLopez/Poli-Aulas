import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import * as CryptoJS from 'crypto-js';
import { Persona } from '../Modelos/persona.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private local: LocalStorageService, private session: SessionStorageService) { }

  user = 'cyrPXjQmiRqg/r+SQuGupQ==';
  pass = 'eHFbmumwF/F3vcF+oCNdCA==';
  name = 'E9XNbHMsSy6gmieYW0CLlA==';
  rol = 'lozAeGbtHgV9eo0IxCdlAw==';

  public isAuthenticated(): boolean {
    const user = this.session.get(this.user);
    const pass = this.session.get(this.pass);
    if (user != null && pass != null) {
      return true;
    }
    return false;
  }

  public logout(): void {
    this.session.remove(this.user);
    this.session.remove(this.pass);
    this.session.remove(this.name);
    this.session.remove(this.rol);
    this.session.clear();
  }

  public getUser(): string {
    return this.decrypt(this.session.get(this.user), this.user)
  }

  public getPass(): string {
    return this.decrypt(this.session.get(this.pass), this.pass)
  }

  public getName(): string {
    return this.decrypt(this.session.get(this.name), this.name)
  }

  public getRol(): number {
    switch (this.session.get(this.rol)) {
      case 'administrador':
        return 0;
      case 'docente':
        return 1;
      case 'estudiante':
        return 2;
      default:
        return 3;
    }
  }

  public login(user: Persona): void {
    this.session.set(this.user, this.encrypt(user.email, this.user), 1800, 's');
    this.session.set(this.pass, this.encrypt(user.password, this.pass), 1800, 's');
    this.session.set(this.name, this.encrypt(user.name, this.name), 1800, 's');
    this.session.set(this.rol, this.encrypt(user.type, this.rol), 1800, 's');
  }

  encrypt(data, key) {
    return CryptoJS.AES.encrypt(data, key).toString();
  }

  decrypt(data, key) {
    return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
  }
}
