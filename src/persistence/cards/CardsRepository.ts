import { ICacheClient } from '../../domain/interfaces/CacheClient.interface';
import { ICard } from '../../domain/interfaces/Card.interface';
import { CardModel } from './CardModel';

export class CardsRepository {
  CACHE_KEY_CARDS = 'cards';

  protected cacheClient: ICacheClient;

  constructor({ cacheClient }) {
    this.cacheClient = cacheClient as ICacheClient;
  }

  async getById (cardId: string, owner: string): Promise<ICard> {
    try {
      const result = await CardModel.findOne({
        _id: cardId,
        owner
      });

      return result.toObject();
    } catch (error) {
      return null;
    }
  }

  async getByIds (cardIds: string[], owner: string): Promise<ICard[]> {
    try {
      const result = await CardModel.find({
        _id: { $in: cardIds },
        owner
      });

      return result.map((card) => card.toObject());
    } catch (error) {
      return null;
    }
  }

  async getAll (owner: string): Promise<ICard[]> {
    const cacheKey = `${this.CACHE_KEY_CARDS}:${owner}:getAll`;
    const cachedResult = await this.cacheClient.get(cacheKey);
    if (typeof cachedResult === 'string') {
      return JSON.parse(cachedResult);
    }

    const result = await CardModel.find({ owner });
    const output = result.map((card) => card.toObject());
    await this.cacheClient.set(cacheKey, output);

    return output;
  }

  async create (card: ICard, owner: string): Promise<ICard> {
    try {
      const result = await CardModel.create({
        ...card,
        owner
      });

      return result.toObject();
    } catch (error) {
      return null;
    }
  }

  async save (cards: ICard[], owner: string): Promise<boolean> {
    let errors = false;

    for (let card of cards) {
      try {
        await CardModel.updateOne({ _id: card._id, owner }, card);
      } catch (error) {
        errors = true;
      }
    }

    return !errors;
  }
}
