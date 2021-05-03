import { CardRepository } from '../../resource-models/cards/repository';
import { CardFactory } from '../../resource-models/cards/factory';
import { ICardsService } from '../../api/cardsService.interface';

export class CardsService implements ICardsService{
  protected cardRepository: CardRepository;
  protected cardFactory: CardFactory;

  constructor ({ cacheClient }) {
    this.cardRepository = new CardRepository({ cacheClient });
    this.cardFactory = new CardFactory();
  }

  async getById (cardId: string) {
    return await this.cardRepository.getById(cardId);
  }

  async getAll () {
    return await this.cardRepository.getAll();
  }

  async create (data: any) {
    const card = await this.cardFactory.create(data);
    const result = await this.cardRepository.save([ data ]);

    return result && card || null;
  }

  async update (data: any) {
    return await this.cardRepository.save([ data ]);
  }
}
