import { Component, inject, effect, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  authService = inject(AuthService);

    loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
    });
  
  loginError = signal<string | null>(null);

  constructor() {
    // Efeito para monitorar mudanças no estado de autenticação
    effect(() => {
      if (this.authService.isAuthenticated()) {
        console.log('Usuário autenticado, redirecionando para o /dashboard...');
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const success = this.authService.login(email!, password!);
      if (!success) {
        this.loginError.set('E-mail ou senha inválidos.');
      } else {
        this.loginError.set(null);
      }
    }
  }
}