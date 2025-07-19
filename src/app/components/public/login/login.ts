import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthService} from '../../../services/auth';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {User} from '../../../model/user';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink,
    NgIf,
    ToastModule
  ],
  templateUrl: './login.html',
  standalone: true,
  styleUrl: './login.css'
})
export class Login {
  user: User = {
    username: '',
    email: '',
    password: ''
  }

  constructor(private readonly authService: AuthService, private readonly messageService: MessageService, private readonly router: Router) { }


  ngOnInit() {
    this.authService.isLoggedIn().subscribe({
      next: (response: any) => {
        if (response.role === 'USER' || response.role === 'ADMIN') {
          this.router.navigate(['/app/dashboard']);
        }
      }
    });
  }

  login() {
    this.authService.login(this.user).subscribe({
      next: (response: any) => {
        this.router.navigate(['/app/dashboard']);
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message
        });
      }
    })
  }

  resetPassword() {

  }
}
