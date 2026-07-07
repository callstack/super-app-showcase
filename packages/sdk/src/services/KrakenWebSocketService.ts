import {ASSETS, KRAKEN_PAIR_TO_SYMBOL} from '../constants';

type PriceListener = (price: number) => void;
export type ConnectionStatus = 'connecting' | 'connected' | 'reconnecting' | 'disconnected';
type StatusListener = (status: ConnectionStatus) => void;

const WS_URL = 'wss://ws.kraken.com';
const RECONNECT_DELAY_MS = 2000;
const MAX_RECONNECT_DELAY_MS = 30000;

class KrakenWebSocketService {
  private static _instance: KrakenWebSocketService;

  private ws: WebSocket | null = null;
  private listeners = new Map<string, Set<PriceListener>>();
  private prices = new Map<string, number>();
  private reconnectDelay = RECONNECT_DELAY_MS;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private intentionalClose = false;
  private _status: ConnectionStatus = 'disconnected';
  private statusListeners = new Set<StatusListener>();

  static get shared(): KrakenWebSocketService {
    if (!KrakenWebSocketService._instance) {
      KrakenWebSocketService._instance = new KrakenWebSocketService();
    }
    return KrakenWebSocketService._instance;
  }

  get status(): ConnectionStatus {
    return this._status;
  }

  onStatusChange(listener: StatusListener): () => void {
    this.statusListeners.add(listener);
    listener(this._status);
    return () => this.statusListeners.delete(listener);
  }

  private setStatus(status: ConnectionStatus): void {
    this._status = status;
    this.statusListeners.forEach(l => l(status));
  }

  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    this.intentionalClose = false;
    this.setStatus('connecting');
    this.ws = new WebSocket(WS_URL);

    this.ws.onopen = () => {
      this.reconnectDelay = RECONNECT_DELAY_MS;
      this.setStatus('connected');
      this.ws?.send(
        JSON.stringify({
          event: 'subscribe',
          pair: ASSETS.map(a => a.krakenPair),
          subscription: {name: 'ticker'},
        }),
      );
    };

    this.ws.onmessage = event => {
      this.handleMessage(event.data);
    };

    this.ws.onclose = () => {
      if (!this.intentionalClose) {
        this.setStatus('reconnecting');
        this.scheduleReconnect();
      } else {
        this.setStatus('disconnected');
      }
    };

    this.ws.onerror = () => {
      this.ws?.close();
    };
  }

  disconnect(): void {
    this.intentionalClose = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.ws?.close();
    this.ws = null;
  }

  subscribe(symbol: string, listener: PriceListener): () => void {
    if (!this.listeners.has(symbol)) {
      this.listeners.set(symbol, new Set());
    }
    this.listeners.get(symbol)!.add(listener);

    // Emit current price immediately if available
    const current = this.prices.get(symbol);
    if (current !== undefined) {
      listener(current);
    }

    return () => {
      this.listeners.get(symbol)?.delete(listener);
    };
  }

  getPrice(symbol: string): number | undefined {
    return this.prices.get(symbol);
  }

  private handleMessage(data: string): void {
    try {
      const msg = JSON.parse(data);

      // Ticker messages are arrays: [channelId, tickerData, "ticker", "XBT/USD"]
      if (!Array.isArray(msg) || msg[2] !== 'ticker') {
        return;
      }

      const krakenPair: string = msg[3];
      const symbol = KRAKEN_PAIR_TO_SYMBOL[krakenPair];
      if (!symbol) {
        return;
      }

      const price = parseFloat(msg[1]?.c?.[0]);
      if (isNaN(price)) {
        return;
      }

      this.prices.set(symbol, price);
      this.listeners.get(symbol)?.forEach(listener => listener(price));
    } catch {
      // Ignore malformed messages
    }
  }

  private scheduleReconnect(): void {
    this.reconnectTimer = setTimeout(() => {
      this.reconnectDelay = Math.min(
        this.reconnectDelay * 2,
        MAX_RECONNECT_DELAY_MS,
      );
      this.connect();
    }, this.reconnectDelay);
  }
}

export {KrakenWebSocketService};