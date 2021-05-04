import { AnalyticsProviderBase } from './AnalyticsProvider.base';

export class AnalyticsProvider01 extends AnalyticsProviderBase {
  protected nameProvider = 'Analytics Provider 01';
  protected urlProvider = 'https://jsonplaceholder.typicode.com/posts';
  protected subscriptionEvents = [
    'cardCreated',
    'cardUpdated'
  ];
}
