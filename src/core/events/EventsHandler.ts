type EventName = string;
type EventCallback = (payload: any) => void;

export class EventsHandler {
  protected static subscribers: Map<EventName, EventCallback[]> = new Map();

  static subscribe(eventName: EventName, callback: EventCallback): void {
    if (!this.subscribers.has(eventName)) {
      this.subscribers.set(eventName, []);
    }

    this.subscribers.get(eventName).push(callback);
  }

  static async dispatch(eventName: EventName, payload: any): Promise<void> {
    if (!this.subscribers.has(eventName)) {
      return;
    }

    await Promise.all(this.subscribers.get(eventName).map(callback => callback(payload)));
  }
}
