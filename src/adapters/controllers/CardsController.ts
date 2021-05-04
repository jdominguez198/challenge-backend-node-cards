import { ICardsService } from '../../domain/ports/CardsService.interface';

export class CardsController {
  protected appInstance: any;
  protected cardsService: ICardsService;

  constructor ({ appInstance, authMiddleware, cardsService }) {
    this.appInstance = appInstance;
    this.cardsService = cardsService as ICardsService;
    this.initializeRoutes(authMiddleware);
  }

  protected initializeRoutes (authMiddleware: any) {
    this.appInstance.get('/v1/cards/:cardId', authMiddleware, this.getCard);
    this.appInstance.get('/v1/cards/', authMiddleware, this.getCards);
    this.appInstance.post('/v1/cards/', authMiddleware, this.createCard);
    this.appInstance.put('/v1/cards/', authMiddleware, this.updateCards);
    this.appInstance.put('/v1/cards/publish', authMiddleware, this.publishCards(true));
    this.appInstance.put('/v1/cards/unpublish', authMiddleware, this.publishCards(false));
    this.appInstance.get('/v1/cards-faker/:owner/:total', authMiddleware, this.fakesGenerator);
  }

  getCard = async (request, response, next) => {
    const cardId = request.params.cardId;
    if (!cardId) {
      response.status(400).send('Missing Card ID');
      return;
    }

    try {
      const card = await this.cardsService.getById(cardId, request.userId);
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
      const cards = await this.cardsService.getAll(request.userId);

      response.json(cards);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }

  createCard = async (request, response, next) => {
    const data = request.body;

    try {
      const card = await this.cardsService.create(data, request.userId);

      response.json(card);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }

  updateCards = async (request, response, next) => {
    const data = request.body;

    try {
      const result = await this.cardsService.update(data, request.userId);

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
      })), request.userId);

      response.json(result);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }

  fakesGenerator = async (request, response, next) => {
    const { owner, total } = request.params;
    if (!owner || !total) {
      response.status(400).send('Bad request');
      return;
    }

    try {
      const result = await this.cardsService.fakesGenerator(owner, parseInt(total));

      response.json(result);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }
}
