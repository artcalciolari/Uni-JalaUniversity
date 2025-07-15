import { Component, inject, signal } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  authService = inject(AuthService);

  // Dados de exemplo para a lista @for
  tasks = signal([
    { id: 1, title: 'Revisar relatório trimestral', done: false },
    { id: 2, title: 'Preparar apresentação para a equipe', done: true },
    { id: 3, title: 'Agendar reunião com cliente', done: false }
  ]);
}