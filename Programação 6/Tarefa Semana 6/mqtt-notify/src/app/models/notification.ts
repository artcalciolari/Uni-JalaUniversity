export interface Notification {
  type: 'mqtt' | 'http' | 'system' | 'ws-client' | string;
  text: string;
  topic?: string;
  ts: string | Date;
  source: 'paho' | 'ws';
}