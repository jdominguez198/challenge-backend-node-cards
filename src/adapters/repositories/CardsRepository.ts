import { ICacheClient } from '../../domain/ports/CacheClient.interface';
import { ICard } from '../../domain/ports/Card.interface';
import { CardModel } from './CardModel';

export class CardsRepository {
  CACHE_KEY_CARDS = 'cards';

  protected cacheClient: ICacheClient;

  constructor({ cacheClient }) {
    this.cacheClient = cacheClient as ICacheClient;
  }

  async getById (cardId: string): Promise<ICard> {
    try {
      const result = await CardModel.findById(cardId);

      return result.toObject();
    } catch (error) {
      return null;
    }
  }

  async getByIds (cardIds: string[]): Promise<ICard[]> {
    try {
      const result = await CardModel.find({
        '_id': { $in: cardIds }
      });

      return result.map((card) => card.toObject());
    } catch (error) {
      return null;
    }
  }

  async getAll (): Promise<ICard[]> {
    const cacheKey = `${this.CACHE_KEY_CARDS}:getAll`;
    const cachedResult = await this.cacheClient.get(cacheKey);
    if (typeof cachedResult === 'string') {
      return JSON.parse(cachedResult);
    }

    const result = await CardModel.find({});
    const output = result.map((card) => card.toObject());
    await this.cacheClient.set(cacheKey, output);

    return output;
  }

  async create (card: ICard): Promise<ICard> {
    try {
      const result = await CardModel.create(card);

      return result.toObject();
    } catch (error) {
      return null;
    }
  }

  async save (cards: ICard[]): Promise<boolean> {
    let errors = false;

    for (let card of cards) {
      try {
        await CardModel.updateOne({ _id: card._id }, card);
      } catch (error) {
        errors = true;
      }
    }

    return !errors;
  }
}
