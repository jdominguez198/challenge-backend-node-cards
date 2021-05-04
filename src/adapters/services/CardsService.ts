import { ICardsService } from '../../domain/ports/CardsService.interface';
import { CardsRepository } from '../repositories/CardsRepository';
import { CardsFactory } from '../repositories/CardsFactory';
import { ICard } from '../../domain/ports/Card.interface';

export class CardsService implements ICardsService {
  protected cardsRepository: CardsRepository;
  protected cardsFactory: CardsFactory;

  constructor ({ cacheClient }) {
    this.cardsRepository = new CardsRepository({ cacheClient });
    this.cardsFactory = new CardsFactory();
  }

  // TODO move to domain validator
  protected validatePublishing (card: ICard) {
    if (!card.published) {
      return true;
    }

    const hasName = card.hasOwnProperty('name') && !!card.name;
    const hasImage = card.hasOwnProperty('image') && !!card.image;
    const hasRarity = card.hasOwnProperty('rarity') && !!card.rarity;

    return hasName && hasImage && hasRarity
  }

  async getById (cardId: string) {
    return await this.cardsRepository.getById(cardId);
  }

  async getAll () {
    return await this.cardsRepository.getAll();
  }

  async create (data: any) {
    if (!this.validatePublishing(data)) {
      return null;
    }

    const card = await this.cardsFactory.create(data);
    const result = await this.cardsRepository.save([ data ]);

    return result && card || null;
  }

  async update (data: any) {
    const multipleData = (data && !data.length && [ data ]) || data;

    // We should obtain the full data of a card to update required attributes
    // in case of "published" is updating to true, so we build an array with
    // card IDs from input data that have missing properties, and then retrieve
    // them from database
    const missingCardIds = multipleData.reduce((output, card) => {
      if (!this.validatePublishing(card)) {
        output.push(card._id);
      }

      return output;
    }, []);

    // Retrieve cards with missing info
    const missingCardsData = await this.cardsRepository.getByIds(missingCardIds);

    // Filter the input array with just the Cards validated
    const validatedData = multipleData.filter((card) => {
      let fullCard = { ...card };
      const storedCard = missingCardsData.find((item) => item._id.toString() === card._id.toString());
      if (storedCard) {
        fullCard = {
          ...storedCard,
          ...card
        };
      }

      return this.validatePublishing(fullCard);
    });

    return await this.cardsRepository.save(validatedData);
  }
}
