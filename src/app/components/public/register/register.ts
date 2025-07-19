import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../services/auth';
import {MessageService} from 'primeng/api';
import {Toast, ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterLink,
    ToastModule
  ],
  templateUrl: './register.html',
  standalone: true,
  styleUrl: './register.css'
})
export class Register {
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private readonly authService: AuthService, private readonly router: Router, private readonly messageService: MessageService) { }

  register() {
    this.authService.register(this.user).subscribe({
      next: (response: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registration successful! Please check your email to verify your account.'
        });
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message
        });
      }
    });
  }
}
