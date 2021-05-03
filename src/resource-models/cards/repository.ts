import { ICacheClient } from '../../api/cacheClient.interface';
import { CardModel, ICard } from '../../models/cards';

export class CardRepository {
  CACHE_KEY_CARDS = 'cards';

  protected cacheClient: ICacheClient;

  constructor({ cacheClient }) {
    this.cacheClient = cacheClient;
  }

  async getById (cardId: string): Promise<ICard> {
    try {
      return await CardModel.findById(cardId);
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
    await this.cacheClient.set(cacheKey, result);

    return result;
  }

  async create (card: ICard): Promise<ICard> {
    try {
      return await CardModel.create(card);
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
