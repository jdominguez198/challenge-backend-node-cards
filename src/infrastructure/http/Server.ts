import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from 'config';

export class Server {
  protected providersResolver: any;
  protected appInstance: express.Express;
  protected rootPathMessage = 'Welcome to Cards API REST!';

  constructor (providersResolver: any) {
    this.appInstance = express();
    this.providersResolver = providersResolver;
  }

  async initializeProviders () {
    const providers = this.providersResolver(this.appInstance);
    await providers.DBConnection();
    providers.analytics.map((provider => provider.init()));
  }

  getPort () {
    return process.env.port || config.get('server.port');
  }

  addThirdPartyMiddlewares () {
    this.appInstance.use(morgan('combined'));
    this.appInstance.use(bodyParser.json());
    this.appInstance.use(bodyParser.urlencoded({extended: true}));
  }

  setBaseRoutes () {
    this.appInstance.get('/', (request, response) => {
      response.send(this.rootPathMessage);
    });
  }

  createServerConnection () {
    const port = this.getPort();
    this.appInstance.listen(port, () => {
      console.log(`Server listening on port ${port}...`);
    });
  }

  async init () {
    this.addThirdPartyMiddlewares();
    this.setBaseRoutes();
    await this.initializeProviders();
    this.createServerConnection();
  }
}
