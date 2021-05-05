import { CardsService } from './CardsService';
import { CardsRepository } from "../../persistence/cards/CardsRepository";
import { mocked } from 'ts-jest/utils';

const cacheClientMock = {};
const eventsHandlerMock = {
  dispatch: () => ({})
};

jest.mock('../../persistence/cards/CardsRepository', () => {
  return {
    CardsRepository: jest.fn().mockImplementation(() => {
      return {
        getByIds: () => [],
        save: (cards, owner) => cards
      }
    })
  }
});

describe('CardsService', () => {
  const MockedCardsRepository = mocked(CardsRepository, true);

  beforeEach(() => {
    MockedCardsRepository.mockClear();
  })

  it('should not update a card if name is empty when card is published', async (done) => {
    const cardsService = new CardsService({
      cacheClient: cacheClientMock,
      eventsHandler: eventsHandlerMock
    });
    const invalidCardData = {
      name: '',
      published: true
    };
    const owner = 'any';
    const result = await cardsService.update(invalidCardData, owner);

    expect(result).toEqual([]);
    done();
  });

  it('should update a card if required fields are filled when card is published', async (done) => {
    const cardsService = new CardsService({
      cacheClient: cacheClientMock,
      eventsHandler: eventsHandlerMock
    });
    const validCardData = {
      name: 'any',
      image: 'any',
      rarity: 'any',
      published: true
    };
    const owner = 'any';
    const result = await cardsService.update(validCardData, owner);

    expect(result).toEqual([ validCardData ]);
    done();
  });
});
