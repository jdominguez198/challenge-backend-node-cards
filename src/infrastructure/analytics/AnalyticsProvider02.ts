import { AnalyticsProviderBase } from './AnalyticsProvider.base';

export class AnalyticsProvider02 extends AnalyticsProviderBase {
  protected nameProvider = 'Analytics Provider 02';
  protected urlProvider = 'https://www.facebook.com/platform/api-status/';
  protected subscriptionEvents = [
    'cardCreated',
    'cardUpdated'
  ];
}
