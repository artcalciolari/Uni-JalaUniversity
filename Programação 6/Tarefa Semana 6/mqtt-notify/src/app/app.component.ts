import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notification } from './models/notification';
import { MqttNgService } from './services/mqtt.service';
import { WsService } from './services/ws.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

type Mode = 'paho' | 'ws';

@Component({
  selector: 'app-root',
  imports: [ FormsModule, DatePipe, CommonModule ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  mode: Mode = 'ws';
  history: Notification[] = [];
  sub?: Subscription;

  // configs rápidas
  readonly brokerUrl = 'wss://3c0383050a26438cb81144ab535f590f.s1.eu.hivemq.cloud:8884/mqtt';
  readonly brokerTopic = 'notifications/#';
  wsUrl = 'wss://localhost:7162/ws';

  status: string = 'disconnected';
  textToSend = 'Hello from Angular';

  constructor(public mqtt: MqttNgService, public ws: WsService) {
    this.switchMode(this.mode);
  }

  switchMode(m: Mode) {
    this.sub?.unsubscribe();
    this.mode = m;

    if (m === 'paho') {
      this.ws.disconnect();
      this.mqtt.connect(
        this.brokerUrl,
        this.brokerTopic,
        'jalau',
        '%#Ac_1610#%'
      );
      this.sub = this.mqtt.messages$.subscribe(n => this.history.unshift(n));
      this.mqtt.status$.subscribe(s => this.status = s);
    } else {
      this.mqtt.disconnect();
      this.ws.connect(this.wsUrl);
      this.sub = this.ws.messages$.subscribe(n => this.history.unshift(n));
      this.ws.status$.subscribe(s => this.status = s);
    }
  }

  send() {
    if (this.mode === 'paho') {
      this.mqtt.publish('notifications/from-angular', this.textToSend);
    } else {
      this.ws.send(this.textToSend);
    }
    this.textToSend = '';
  }

  trackByIdx(i: number) { return i; }

  ngOnDestroy(): void { this.sub?.unsubscribe(); this.mqtt.disconnect(); this.ws.disconnect(); }
}
