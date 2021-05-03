import auth from '../middleware/auth';
import cardsRoutes from './cards';

const assignRoutes = (app) => {
  app.use('/cards', auth, cardsRoutes);
  app.get('/', (request, response) => {
    response.send('Welcome to Cards API REST!');
  });
};

export default assignRoutes;
