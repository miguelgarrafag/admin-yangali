import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;
  private loginTimestamp: number = 0;
  constructor() { }
  login() {
    this.loggedIn = true;
    this.loginTimestamp = new Date().getTime();
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('loginTimestamp', this.loginTimestamp.toString());
  }
  logout() {
    this.loggedIn = false;
    this.loginTimestamp = 0;
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loginTimestamp');
  }
  isLoggedIn(): boolean {
    const timestamp = parseInt(localStorage.getItem('loginTimestamp') || '0');
    if (timestamp) {
      const currentTime = new Date().getTime();
      if (currentTime - timestamp < 30 * 60 * 1000) {
        return true;
      }
    }
    this.logout();
    return false;
  }
  checkSession(): boolean {
    return this.isLoggedIn();
  }
}
