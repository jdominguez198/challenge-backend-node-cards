import { CardModel } from './CardModel';

export class CardsFactory {
  async create (data: any, owner: string) {
    try {
      return await CardModel.create({
        ...data,
        owner
      });
    } catch (error) {
      console.log('Card create error: ', error);
      return null;
    }
  }
}
