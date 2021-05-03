import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from 'config';

import DBConnection from './lib/database';
import resolveDI from './lib/injections';
import assignRoutes from './routes';

const app = express();
const port = process.env.port || config.get('server.port');

app.use(morgan('combined'));
app.use(bodyParser.json());

assignRoutes(app, resolveDI());

(
  async () => {
    await DBConnection();

    app.listen(port, () => {
      console.log(`Server listening on port ${port}...`);
    });
  }
)()
  .catch(error => console.error(error));


