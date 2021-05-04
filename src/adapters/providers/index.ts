import cacheClient from '../../infrastructure/cache/CacheClient';
import DBConnection from '../../infrastructure/database/Database';
import auth from '../middleware/auth';
import { AuthService } from '../services/AuthService';
import { CardsService } from '../services/CardsService';
import { CardsController } from '../controllers/CardsController';
import jwt from 'jsonwebtoken';

const providers = (appInstance) => ({
  cacheClient,
  cardsController: new CardsController({
    appInstance,
    authMiddleware: auth(new AuthService({ jwt })),
    cardsService: new CardsService({ cacheClient }),
  }),
  DBConnection,
});

export default providers;
