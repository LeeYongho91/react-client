import mongoose from 'mongoose';
import config from 'config';
import { logger } from '@utils/logger';

async function connect() {
  let dbUri = config.get<string>('mongoURI');
  if (config.get<string>('env') === 'production') dbUri = process.env.MONGO_URI;
  try {
    await mongoose.connect(dbUri);
    logger.info('✅ ====== MONGODB CONNECT ====== ✅');
  } catch (error) {
    console.log(error);
    logger.error('Could not connect to db');
    process.exit(1);
  }
}

export default connect;
