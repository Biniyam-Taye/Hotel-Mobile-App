import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import routes from './routes/index.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { stripeWebhook } from './controllers/paymentController.js';

const app = express();

// ─── Security ───────────────────────────────────────────────────────
app.use(helmet());

const corsOrigins = process.env.CORS_ORIGINS?.split(',').map((o) => o.trim()) ?? ['*'];
app.use(
  cors({
    origin: corsOrigins.includes('*') ? true : corsOrigins,
    credentials: true,
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// ─── Stripe webhook needs raw body BEFORE json parser ───────────────
app.post('/api/v1/payments/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── API Routes ─────────────────────────────────────────────────────
const apiVersion = process.env.API_VERSION || 'v1';
app.use(`/api/${apiVersion}`, routes);

// ─── Error handling ─────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
