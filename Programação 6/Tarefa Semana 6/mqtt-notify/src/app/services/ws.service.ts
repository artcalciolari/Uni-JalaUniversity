import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { Notification } from '../models/notification';

@Injectable({ providedIn: 'root' })
export class WsService {
  private socket?: WebSocket;
  private url?: string;
  private wantOpen = false;

  public status$ = new BehaviorSubject<'disconnected'|'connecting'|'connected'>('disconnected');
  public messages$ = new Subject<Notification>();

  constructor(private zone: NgZone) {}

  connect(url: string) {
    this.url = url;
    this.wantOpen = true;
    this.open();
  }

  private open() {
    if (!this.url) return;
    this.status$.next('connecting');
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => this.zone.run(() => this.status$.next('connected'));
    this.socket.onclose = () => this.zone.run(() => {
      this.status$.next('disconnected');
      if (this.wantOpen) timer(1500).subscribe(() => this.open()); // auto-retry
    });
    this.socket.onerror = () => this.zone.run(() => this.status$.next('disconnected'));
    this.socket.onmessage = (ev) => {
      let parsed: any;
      try { parsed = JSON.parse(ev.data); } catch { parsed = { type: 'raw', text: String(ev.data) }; }
      const notif: Notification = {
        type: parsed?.type ?? 'ws',
        text: parsed?.text ?? JSON.stringify(parsed),
        topic: parsed?.topic,
        ts: parsed?.ts ?? new Date(),
        source: 'ws'
      };
      this.zone.run(() => this.messages$.next(notif));
    };
  }

  send(text: string) { this.socket?.readyState === 1 && this.socket.send(text); }
  disconnect() { this.wantOpen = false; this.socket?.close(); this.status$.next('disconnected'); }
}
