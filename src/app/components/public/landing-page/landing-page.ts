import { Component } from '@angular/core';
import {Footer} from '../footer/footer';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [
    Footer,
    RouterLink
  ],
  templateUrl: './landing-page.html',
  standalone: true,
  styleUrl: './landing-page.css'
})
export class LandingPage {

}
