import express from 'express';
import config from 'config';

const app = express();
const port = process.env.port || config.get('server.port');

app.get('/', (request, response) => {
  response.send('YEAH!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
