import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Client, Message } from 'paho-mqtt';
import { Notification } from '../models/notification';

@Injectable({ providedIn: 'root' })
export class MqttNgService {
  private client?: Client;
  public status$ = new BehaviorSubject<'disconnected'|'connecting'|'connected'>('disconnected');
  public messages$ = new Subject<Notification>();

  connect(
    brokerUrl: string = 'wss://3c0383050a26438cb81144ab535f590f.s1.eu.hivemq.cloud:8883/mqtt',
    topic: string = 'notifications/#',
    username: string = 'jalau',
    password: string =   '%#Ac_1610#%'
  ) {
    if (this.client) this.client.disconnect();

    const url = new URL(brokerUrl);
    const clientId = `ng-${Math.random().toString(16).slice(2)}`;

    this.client = new Client(url.hostname, Number(url.port), url.pathname, clientId);

    this.client.onConnectionLost = () => this.status$.next('disconnected');
    this.client.onMessageArrived = m => {
      this.messages$.next({
        type: 'mqtt',
        text: m.payloadString ?? '',
        topic: m.destinationName ?? undefined,
        ts: new Date(),
        source: 'paho'
      });
    };

    this.status$.next('connecting');
    this.client.connect({
      useSSL: url.protocol === 'wss:',
      userName: username,
      password: password,
      onSuccess: () => {
        this.status$.next('connected');
        this.client?.subscribe(topic);
      },
      onFailure: () => this.status$.next('disconnected'),
      keepAliveInterval: 30,
      reconnect: true
    });
  }

  publish(topic: string, text: string) {
    if (!this.client) return;
    const msg = new Message(text);
    msg.destinationName = topic;
    this.client.send(msg);
  }

  disconnect() { this.client?.disconnect(); this.status$.next('disconnected'); }
}
