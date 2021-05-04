import jwt from 'jsonwebtoken';
import cacheClient from '../../infrastructure/cache/CacheClient';
import DBConnection from '../../infrastructure/database/Database';
import auth from '../middleware/auth';
import { AuthService } from '../services/AuthService';
import { CardsService } from '../services/CardsService';
import { CardsController } from '../controllers/CardsController';
import { EventsHandler } from '../events/EventsHandler';
import { AnalyticsProvider01 } from '../../infrastructure/analytics/AnalyticsProvider01';
import { AnalyticsProvider02 } from '../../infrastructure/analytics/AnalyticsProvider02';

const providers = (appInstance) => ({
  cacheClient,
  cardsController: new CardsController({
    appInstance,
    authMiddleware: auth(new AuthService({ jwt })),
    cardsService: new CardsService({
      cacheClient,
      eventsHandler: EventsHandler
    }),
  }),
  DBConnection,
  analytics: [
    new AnalyticsProvider01(),
    new AnalyticsProvider02()
  ]
});

export default providers;
