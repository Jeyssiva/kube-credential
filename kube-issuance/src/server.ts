
import app from './app';
import logger from './utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logger.info(`Issuance service listening on port ${PORT} - worker ${process.env.WORKER_ID || 'worker-local'}`);
});