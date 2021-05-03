import cacheClient from './cache';
import { CardsService } from '../services/cards';

const injections = () => ({
  cacheClient,
  cardsService: new CardsService({ cacheClient })
});

export default injections;
