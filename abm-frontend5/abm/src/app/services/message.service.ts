
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';




export interface Message {
  status: string;
  id: string;
}

@Injectable()
export class MessageService {

  public messages: Subject<Message>;
  buildSocketUrl = 'ws://localhost:8080/ws/build';
  constructor(wsService: WebsocketService) {
    this.messages = <Subject<Message>>wsService
      .connect(this.buildSocketUrl).pipe(
      map((response: MessageEvent): Message => {
        const data = JSON.parse(response.data);
        return data;
        // return {
        //   status: data.status,
        //   id: data.id
        // };
      }));
  }

}
