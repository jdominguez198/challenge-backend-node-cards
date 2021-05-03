const express = require('express');
const router = express.Router();

const getCards = (request, response, next) => {
  response.send([]);
};

const updateCard = (request, response, next) => {
  response.send({});
};

router
  .get('/', getCards)
  .post('/', updateCard)
;

export default router;
