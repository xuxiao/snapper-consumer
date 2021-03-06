declare namespace Consumer {

  export interface TCMParam {
    appid: string,
    collapseKey: string,
    data: string
  }

  export interface RequestObject {
    id: number;
    jsonrpc: string;
    method: 'publish' | 'notification' | 'success' | 'error' | 'invalid';
    params: string[] | TCMParam[];
  }

  export interface RequestEvent {
    id: number;
    type: 'request' | 'invalid' | 'notification' | 'success' | 'error';
    data: RequestObject;
  }
}

declare class Consumer {
  constructor(url?: string, options?: {
    token: string;
    query: string;
  });

  onopen: Function;
  onclose: Function;
  onerror(err: Error): void;
  onmessage(event: Consumer.RequestEvent): void;
  request(method: string, params: {
    [index: string]: any
  } | any[], callback: (err: Error, res: any) => any): Consumer;
  join(room?: string): Consumer;
  getToken(): string;
  _join(roomId: string, consumerId: string): any;
  _respond(event: string): void;
  connect(url: string, options?: {
    token: string;
    path?: string;
    query?: string;
    [index: string]: any;
  }): Consumer;
  close(): void;
}

export = Consumer
