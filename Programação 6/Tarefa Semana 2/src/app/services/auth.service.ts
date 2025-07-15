import { Injectable, signal, computed, WritableSignal, Signal } from '@angular/core';

// Interface para definir a estrutura do usuário
export interface User {
  email: string;
  name: string;
  permissions: ('view_dashboard' | 'edit_settings')[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Inicia um Signal para armazernar os dados do usuário. Inicia como nulo.
  currentUser: WritableSignal<User | null> = signal(null);

  // Computed signal para verificar se o usuário está "autenticado"
  isAuthenticated: Signal<boolean> = computed(() => !!this.currentUser());

  // Computed signal para verificar as permissões do usuário
  userPermissions: Signal<string[]> = computed(() => this.currentUser()?.permissions ?? []);

  constructor() { }

  // Simula um login. 
  login(email: string, password: string): boolean {
    if (email === 'admin@email.com' && password === '1234') {
      // Define o valor do signal com os dados do usuário
      this.currentUser.set({
        email: 'admin@user.com',
        name: 'Admin User',
        permissions: ['view_dashboard', 'edit_settings']
      });
      return true;
    }
    return false;
  }

  logout(): void {
    // Reseta o signal do estado inicial
    this.currentUser.set(null);
  }
}