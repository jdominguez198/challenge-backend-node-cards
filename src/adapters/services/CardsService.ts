import { ICardsService } from '../../domain/ports/CardsService.interface';
import { CardsRepository } from '../repositories/CardsRepository';
import { CardsFactory } from '../repositories/CardsFactory';

export class CardsService implements ICardsService {
  protected cardsRepository: CardsRepository;
  protected cardsFactory: CardsFactory;

  constructor ({ cacheClient }) {
    this.cardsRepository = new CardsRepository({ cacheClient });
    this.cardsFactory = new CardsFactory();
  }

  async getById (cardId: string) {
    return await this.cardsRepository.getById(cardId);
  }

  async getAll () {
    return await this.cardsRepository.getAll();
  }

  async create (data: any) {
    const card = await this.cardsFactory.create(data);
    const result = await this.cardsRepository.save([ data ]);

    return result && card || null;
  }

  async update (data: any) {
    const multipleData = (data && !data.length && [ data ]) || data;
    return await this.cardsRepository.save(multipleData);
  }
}
