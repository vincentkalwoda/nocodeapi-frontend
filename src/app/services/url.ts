import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  getUrl(): string {
    return 'https://localhost:5443/api/v1';
  }
}
