import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import issuanceRoutes from './routes/issuance.routes';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/api', issuanceRoutes);
app.use(errorHandler);

export default app;