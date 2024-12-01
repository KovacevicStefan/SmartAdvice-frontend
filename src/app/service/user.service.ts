import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  private readonly API_URL = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  clearUser() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getCurrentUserId(): number {
    const user = localStorage.getItem('user')!;
    const parsedUser = JSON.parse(user) as User;
    return parsedUser.id;
  }

  updatePassword(userId: number, oldPassword: string, newPassword: string) {
    return this.http.put(`${this.API_URL}/user/updatePassword`, { userId, oldPassword, newPassword });
  }

  login(username: string, password: string) {
    console.log(username);
    console.log(password);
    return this.http.post<{ token: string, user: User }>(`${this.API_URL}/login`, { username, password });
  }
}
