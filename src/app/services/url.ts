import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  getUrl(): string {
    return 'https://empleo.at/novaapi/v1';
  }
}
