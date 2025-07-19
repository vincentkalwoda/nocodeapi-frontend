import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UrlService} from './url';
import {catchError, map, Observable, tap, throwError} from 'rxjs';
import {Project} from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url: string;
  private readonly jsonHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private readonly http: HttpClient, private readonly urlService: UrlService) {
    this.url = this.urlService.getUrl();
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.url}/projects/getProjects`, {
      headers: this.jsonHeaders,
      withCredentials: true
    }).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  getProjectByApiKey(apiKey: string | null): Observable<Project> {
    return this.http.get<Project>(`${this.url}/projects/getProject/${apiKey}`, {
      headers: this.jsonHeaders,
      withCredentials: true
    }).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  getProjectStats(apiKey: string | null): Observable<any> {
    return this.http.get<any>(`${this.url}/requests/getRequestStats/${apiKey}`, {
      headers: this.jsonHeaders,
      withCredentials: true
    }).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  getEntitiesByProjectApiKey(apiKey: string | null): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/entities/getEntities/${apiKey}`, {
      headers: this.jsonHeaders,
      withCredentials: true
    }).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  getProjectState(apiKey: string | null): Observable<any> {
    return this.http.get<any>(`${this.url}/generator/status/${apiKey}`, {
      headers: this.jsonHeaders,
      withCredentials: true
    }).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  generateProjectStructure(projectApiKey: string, input: string): Observable<any> {
    return this.http.post(`${this.url}/ai/generateModel/` + projectApiKey, input, {
      headers: this.jsonHeaders,
      withCredentials: true
    }).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  getPromptHistory(projectApiKey: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/promptHistory/getPromptHistory/${projectApiKey}`, {
      headers: this.jsonHeaders,
      withCredentials: true
    }).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  createProjectStructure(projectApiKey: string, model: string): Observable<any> {
    return this.http.post(`${this.url}/ai/createModel/${projectApiKey}`, model, {
      headers: this.jsonHeaders,
      withCredentials: true
    }).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error:', error);
    return throwError(() => error);
  }

}
