import auth from '../middleware/auth';
import cardsRoutes from './cards';

const assignRoutes = (app, injection) => {
  app.use('/cards', auth, cardsRoutes(injection));
  app.get('/', (request, response) => {
    response.send('Welcome to Cards API REST!');
  });
};

export default assignRoutes;
