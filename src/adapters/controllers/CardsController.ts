import { ICardsService } from '../../domain/ports/CardsService.interface';

export class CardsController {
  protected appInstance: any;
  protected cardsService: ICardsService;

  constructor ({ appInstance, cardsService }) {
    this.appInstance = appInstance;
    this.cardsService = cardsService as ICardsService;
    this.initializeRoutes();
  }

  protected initializeRoutes () {
    this.appInstance.get('/v1/cards/:cardId', this.getCard);
    this.appInstance.get('/v1/cards/', this.getCards);
    this.appInstance.post('/v1/cards/', this.createCard);
    this.appInstance.put('/v1/cards/', this.updateCards);
    this.appInstance.put('/v1/cards/publish', this.publishCards(true));
    this.appInstance.put('/v1/cards/unpublish', this.publishCards(false));
  }

  getCard = async (request, response, next) => {
    const cardId = request.params.cardId;
    if (!cardId) {
      response.status(400).send('Missing Card ID');
      return;
    }

    try {
      const card = await this.cardsService.getById(cardId);
      if (!card) {
        response.status(404).send('Card not found');
        return;
      }

      response.json(card);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }

  getCards = async (request, response, next) => {
    try {
      const cards = await this.cardsService.getAll();

      response.json(cards);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }

  createCard = async (request, response, next) => {
    const data = request.body;

    try {
      const card = await this.cardsService.create(data);

      response.json(card);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }

  updateCards = async (request, response, next) => {
    const data = request.body;

    try {
      const result = await this.cardsService.update(data);

      response.json(result);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }

  publishCards = (publish) => async (request, response, next) => {
    const data = request.body;

    if (!data || !data.length) {
      response.status(400).send('Missing Card IDs');
      return;
    }

    try {
      const result = await this.cardsService.update(data.map((cardId) => ({
        _id: cardId,
        published: publish
      })));

      response.json(result);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }
}
