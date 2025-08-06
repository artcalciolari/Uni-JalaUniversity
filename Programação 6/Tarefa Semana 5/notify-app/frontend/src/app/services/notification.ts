import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket: Socket;
  private readonly serverUrl = 'http://localhost:3000';

  private notificationSubject: Subject<string> = new Subject<string>();

  constructor() {
    this.socket = io(this.serverUrl);
    this.listenForNotifications();
  }


  public getNotifications(): Observable<string> {
    return this.notificationSubject.asObservable();
  }

  private listenForNotifications(): void {
    this.socket.on('notification', (message: string) => {
      console.log('Notificação recebida do servidor:', message);
      this.notificationSubject.next(message);
    });

    this.socket.on('connect', () => {
      console.log(`Conectado ao servidor de notificações com ID: ${this.socket.id}`);
    });

    this.socket.on('disconnect', () => {
      console.warn('Desconectado do servidor de notificações.');
    });
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}