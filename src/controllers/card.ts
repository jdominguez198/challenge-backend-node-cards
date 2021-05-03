import { ICardsService } from '../api/cardsService.interface';

export class CardController {

  protected cardsService: ICardsService;

  constructor (cardsService: ICardsService) {
    this.cardsService = cardsService;
  }

  async getCard (cardId: string) {
    return await this.cardsService.getById(cardId);
  }

  async getCards () {
    return await this.cardsService.getAll();
  }

  async createCard (data: any) {
    return await this.cardsService.create(data);
  }

  async updateCard (data: any) {
    return await this.cardsService.update([ data ]);
  }

  async updateCards (data: any) {
    return await this.cardsService.update(data);
  }
}
