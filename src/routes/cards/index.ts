const express = require('express');
const router = express.Router();

import { CardController } from '../../controllers/card';

const getCard = (injections) => async (request, response, next) => {
  const cardId = request.params.cardId;
  if (!cardId) {
    response.status(400).send('Missing Card ID');
    return;
  }

  const controller = new CardController(injections.cardsService);
  const card = await controller.getCard(cardId);

  if (!card) {
    response.status(404).send('Card not found');
    return;
  }

  response.json(card);
};

const getCards = (injections) => async (request, response, next) => {
  const controller = new CardController(injections.cardsService);
  const cards = await controller.getCards();

  response.json(cards);
};

const createCard = (injections) => async (request, response, next) => {
  const data = request.body;
  const controller = new CardController(injections.cardsService);
  const card = await controller.createCard(data);

  response.json(card);
}

const updateCard = (injections) => async (request, response, next) => {
  response.json({});
};

const routerBuilder = (injections) => router
    .get('/:cardId', getCard(injections))
    .get('/', getCards(injections))
    .post('/', createCard(injections))
    .put('/', updateCard(injections))
;

export default routerBuilder;
