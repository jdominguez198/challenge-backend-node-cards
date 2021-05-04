import { CardModel } from './CardModel';

export class CardsFactory {
  async create (data) {
    try {
      return await CardModel.create(data);
    } catch (error) {
      console.log('Card create error: ', error);
      return null;
    }
  }
}
