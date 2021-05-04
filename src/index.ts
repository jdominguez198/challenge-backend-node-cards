import { Server } from './infrastructure/http/Server';
import providersResolver from './core/providers';

const server = new Server(providersResolver);

(
  async () => {
    await server.init();
  }
)()
  .catch(error => console.error(error));
