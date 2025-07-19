import {Component, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgClass, NgIf} from '@angular/common';
import {MessageService, PrimeTemplate} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {AuthService} from './services/auth';
import {Footer} from './components/public/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgClass, PrimeTemplate, NgIf, ToastModule, Footer],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class App {
  items = [
    {
      label: 'Home',
      routerLink: "/"
    },
    {
      label: 'Über uns',
      routerLink: "ueber-uns"
    },
    {
      label: 'Services',
      routerLink: "services"
    },
    {
      label: 'Kontakt',
      routerLink: "kontakt"
    }
  ];

  user: any;
  loggedIn = false;
  role: string | undefined;

  constructor(protected router: Router, private readonly authService: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.handleNavigationEnd(event);
      }
    });
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe({
      next: (response: any) => {
        this.loggedIn = true;
      },
      error: () => {
        this.loggedIn = false;
      }
    });
  }

  private handleNavigationEnd(event: NavigationEnd) {
    if (event.url === '/logout') {
      this.loggedIn = false;
      this.user = null;
    } else if (event.url.includes('/profile')) {
      this.loggedIn = true;
    }
  }
}
