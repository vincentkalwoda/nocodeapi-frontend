import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  getUrl(): string {
    return 'https://empleo.at:5443/novaapi/v1';
  }
}
