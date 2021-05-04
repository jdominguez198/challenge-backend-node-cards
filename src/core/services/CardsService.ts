import { ICardsService } from '../../domain/interfaces/CardsService.interface';
import { CardsRepository } from '../../persistence/cards/CardsRepository';
import { CardsFactory } from '../../persistence/cards/CardsFactory';
import { ICard } from '../../domain/interfaces/Card.interface';

import faker from 'faker';

export class CardsService implements ICardsService {
  protected cardsRepository: CardsRepository;
  protected cardsFactory: CardsFactory;
  protected eventsHandler;

  constructor ({ cacheClient, eventsHandler }) {
    this.eventsHandler = eventsHandler;
    this.cardsRepository = new CardsRepository({ cacheClient });
    this.cardsFactory = new CardsFactory();
  }

  // TODO move to a validator object
  protected validatePublishing (card: ICard) {
    if (!card.published) {
      return true;
    }

    const hasName = card.hasOwnProperty('name') && !!card.name;
    const hasImage = card.hasOwnProperty('image') && !!card.image;
    const hasRarity = card.hasOwnProperty('rarity') && !!card.rarity;

    return hasName && hasImage && hasRarity
  }

  async getById (cardId: string, owner: string) {
    return await this.cardsRepository.getById(cardId, owner);
  }

  async getAll (owner: string) {
    return await this.cardsRepository.getAll(owner);
  }

  async create (data: any, owner: string) {
    if (!this.validatePublishing(data)) {
      return null;
    }

    const card = await this.cardsFactory.create(data, owner);
    const result = await this.cardsRepository.save([ card ], owner);

    await this.eventsHandler.dispatch('cardCreated', card);

    return result && card || null;
  }

  async update (data: any, owner) {
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
    const missingCardsData = await this.cardsRepository.getByIds(missingCardIds, owner);

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

    const resultCard = await this.cardsRepository.save(validatedData, owner);

    await this.eventsHandler.dispatch('cardUpdated', resultCard);

    return resultCard;
  }

  // Just a fake cards generator to have some dummy content in database
  async fakesGenerator (owner: string, total: number) {
    const cards: ICard[] = Array(total).fill(null).map(() => ({
      owner,
      name: faker.commerce.productName(),
      image: faker.image.imageUrl(),
      rarity: 'rare',
      type: 'regular',
      published: true
    }));

    return await Promise.all(cards.map(async (card) => await this.create(card, owner)));
  }
}
