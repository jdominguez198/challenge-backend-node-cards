import axios from 'axios';
import { EventsHandler } from '../../core/events/EventsHandler';
import { IAnalyticsProvider } from '../../domain/interfaces/AnalyticsProvider.interface';

export class AnalyticsProviderBase implements IAnalyticsProvider {
  protected client: any;
  protected urlProvider: string;
  protected nameProvider: string;
  protected subscriptionEvents = [];

  constructor() {
    this.client = axios;
  }

  // The request should not be synchronous to avoid stop API processes due to provider issues
  protected makeRequest (event: string, payload: any) {
    this.client.post(this.urlProvider, {
      event,
      payload
    })
      .then(() => console.log(`Fired event "${event}" to ${this.nameProvider}`))
      .catch((error) => console.log(`Error requesting to ${this.nameProvider}`))
  }

  subscribeEvents (): void {
    this.subscriptionEvents.map((event) => {
      EventsHandler.subscribe(event, (payload: any) => this.makeRequest(event, payload));
    })
  }

  init (): void {
    this.subscribeEvents();
  }
}
