import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {Footer} from '../../public/footer/footer';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterOutlet,
    MegaMenuModule,
    MenuModule,
    NgIf,
    NgStyle,
    NgForOf,
    Footer
  ],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  items = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      route: '/app/dashboard',
    },
    {
      label: 'APIs',
      icon: 'pi pi-server',
      route: '/app/apis',
      route2: '/app/api-details',
    },
    {
      label: 'Keys',
      icon: 'pi pi-key',
      route: '/app/keys',
    },
    {
      label: 'Logs',
      icon: 'pi pi-list',
      route: '/app/logs',
    },

    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      route: '/logout',
    }
  ];


  constructor(private readonly router: Router) {
  }

  isActive(item: any): boolean {
    return this.router.url.includes(item.route) || this.router.url.includes(item.route2);
  }
}
