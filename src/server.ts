import express from 'express';
import morgan from 'morgan';
import config from 'config';

import DBConnection from './lib/database';
import assignRoutes from './routes';

const app = express();
const port = process.env.port || config.get('server.port');

app.use(morgan('combined'));

assignRoutes(app);

(
  async () => {
    await DBConnection();

    app.listen(port, () => {
      console.log(`Server listening on port ${port}...`);
    });
  }
)()
  .catch(error => console.error(error));


