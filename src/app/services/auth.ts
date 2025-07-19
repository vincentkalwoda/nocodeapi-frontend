import { Injectable } from '@angular/core';
import {catchError, map, Observable, ReplaySubject, tap, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UrlService} from './url';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userSubject = new ReplaySubject<User | null>(1);
  private readonly roleSubject = new ReplaySubject<string | undefined>(1);
  user$: Observable<User| null> = this.userSubject.asObservable();
  role$: Observable<string | undefined> = this.roleSubject.asObservable();
  private readonly url: string;
  private readonly jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private readonly http: HttpClient, private readonly urlService: UrlService) {
    this.url = this.urlService.getUrl();
  }

  setUser(user: User | null): void {
    this.userSubject.next(user);
  }

  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  clearUser(): void {
    this.userSubject.next(null);
  }

  setRole(role: string): void {
    this.roleSubject.next(role);
  }

  getRole(): Observable<string | undefined> {
    return this.roleSubject.asObservable();
  }

  clearRole(): void {
    this.roleSubject.next(undefined);
  }

  register(user: User): Observable<User> {
    const body = JSON.stringify(user);
    return this.http.post<User>(`${this.url}/register`, body, { headers: this.jsonHeaders, withCredentials: true }).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  login(user: User): any {
    const body = JSON.stringify({ username: user.username, password: user.password });
    return this.http.post<any>(`${this.url}/login`, body, { headers: this.jsonHeaders, withCredentials: true }).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  isLoggedIn(): Observable<string> {
    return this.http.get<Object>(`${this.url}/validate`, { headers: this.jsonHeaders, withCredentials: true }).pipe(
      map((response: any) => response as string),
      tap(),
      catchError(this.handleError)
    );
  }

  logout() {
    return this.http.post(`${this.url}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        // Nur für Sichtbarkeit:
        console.log('Logged out');
      })
    );
  }


  private handleError(error: any): Observable<never> {
    console.error('Error:', error);
    return throwError(() => error);
  }
}
