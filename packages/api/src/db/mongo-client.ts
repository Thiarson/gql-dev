import { MongoClient } from 'mongodb';

export const mongo = new MongoClient(process.env.MONGODB_URI!, {
  maxPoolSize: 20,
  maxIdleTimeMS: 60_000,
  waitQueueTimeoutMS: 5_000,
  serverSelectionTimeoutMS: 5_000,
});

await mongo.connect();

process.on('SIGTERM', async () => {
  await mongo.close();
  process.exit(0);
});
