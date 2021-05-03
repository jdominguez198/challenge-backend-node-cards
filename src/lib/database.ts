import mongoose from 'mongoose';
import config from 'config';

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => console.log('Database connection established!'));

mongoose.connection.on('reconnected', () => console.log('Database connection reestablished!'));

mongoose.connection.on('disconnected', () => console.log('Database disconnected'));

mongoose.connection.on('close', () => console.log('Database connection closed'));

mongoose.connection.on('error', (error) =>
  console.log(`Database connection failure with error "${error.message}". Check configuration and/or network and try again.`));

const DBConnection = async () => {
  const dbHost = config.get('database.hostname');
  const dbPort = config.get('database.port');
  const dbName = config.get('database.name');

  await mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
};

export default DBConnection;
