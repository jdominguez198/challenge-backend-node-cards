import redis from 'redis';
import util from 'util';
import config from 'config';
import { ICacheClient } from '../api/cacheClient.interface';

const client = redis.createClient({
  host: config.get('cache.hostname'),
  port: config.get('cache.port'),
  db: config.get('cache.db')
});

client.get = util.promisify(client.get);
client.on('connect', () =>  console.error('Cache server connected!'));
client.on('ready', () =>  console.error('Cache server is ready!'));
client.on('error', (error) =>  console.error('Cache server thrown error: ', error));

const get = async (key) => {
  return await client.get(key);
}

const set = async (key, data) => {
  await client.set(
    key,
    JSON.stringify(data),
    'EX',
    config.get('cache.expirationTime', 3600)
  );

  return data;
}

const cacheClient: ICacheClient = { get, set };

export default cacheClient;
