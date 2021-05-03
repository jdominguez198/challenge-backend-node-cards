import { CardModel } from '../../models/cards';

export class CardFactory {
  async create (data) {
    try {
      return await CardModel.create(data);
    } catch (error) {
      console.log('Card create error: ', error);
      return null;
    }
  }
}
