
import app from './app';
import logger from './utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  logger.info(`Verification service listening on port ${PORT} - worker ${process.env.WORKER_ID || 'verification-worker'}`);
});