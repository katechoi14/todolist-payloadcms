import dotenv from 'dotenv';
import express from 'express';
import payload from 'payload';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const app = express();
const PORT = process.env.PAYLOAD_PORT || 3001;

const start = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '',
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  if (process.env.PAYLOAD_SEED === 'true') {
    await seed(payload);
    process.exit();
  }

  app.listen(PORT, () => {
    payload.logger.info(`Payload CMS server listening on port ${PORT}`);
  });
};

start();
