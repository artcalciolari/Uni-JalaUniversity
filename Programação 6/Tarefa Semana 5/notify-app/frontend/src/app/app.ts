import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from './services/notification';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [CommonModule, FormsModule]
})
export class App implements OnInit, OnDestroy {
  title = 'App de Notificações em Tempo Real';
  
  notifications: string[] = [];
  message: string = '';
  isSending: boolean = false;
  sendError: string | null = null;

  private notificationSubscription: Subscription;

  constructor(private notificationService: NotificationService) {
    this.notificationSubscription = Subscription.EMPTY;
  }

  ngOnInit(): void {
    this.notificationSubscription = this.notificationService.getNotifications()
      .subscribe((message: string) => {
        this.notifications.unshift(message); // 'unshift' adiciona no início
      });
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }

  async sendNotification() {
    if (!this.message.trim()) return;
    this.isSending = true;
    this.sendError = null;
    try {
      const response = await fetch('http://localhost:3000/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: this.message })
      });
      if (!response.ok) throw new Error('Erro ao enviar mensagem');
      this.message = '';
    } catch (err: any) {
      this.sendError = err.message || 'Erro desconhecido';
    } finally {
      this.isSending = false;
    }
  }
}