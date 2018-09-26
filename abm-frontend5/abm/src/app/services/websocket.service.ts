import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebsocketService {

  private socket: Rx.Subject<MessageEvent>;

  constructor() { }

  public connect(url): Rx.Subject<MessageEvent> {

    if (!this.socket) {
      this.socket = this.create(url);
      console.log('Successfully connected ' + url);
    }

    return this.socket;
  }

  private create(url): Rx.Subject<MessageEvent> {

    const ws = new WebSocket(url);
    ws.binaryType = 'arraybuffer';
    const observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      }
    );
    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          console.log('Socket is open');
          console.log(data + ' inside websocket service');
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Rx.Subject.create(observer, observable);
  }

}