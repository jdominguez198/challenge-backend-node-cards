import cacheClient from '../../infrastructure/cache/CacheClient';
import DBConnection from '../../infrastructure/database/Database';
import auth from '../middleware/auth';
import { CardsService } from '../services/CardsService';
import { CardsController } from '../controllers/CardsController';

const providers = (appInstance) => ({
  cacheClient,
  cardsController: new CardsController({
    appInstance,
    authMiddleware: auth,
    cardsService: new CardsService({ cacheClient }),
  }),
  DBConnection
});

export default providers;
