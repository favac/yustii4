// Libraries
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

// dotenv of nest
import { ConfigService } from '@nestjs/config';

// Swagger config
import { setSwaggerConfig } from './swagger.config';

global['fetch'] = require('node-fetch');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Set prefix
  app.setGlobalPrefix('api-admin');

  // Set swagger docs
  setSwaggerConfig(app);

  // Set helmet config
  app.use(helmet());

  //instance of configService
  const config = app.get<ConfigService>(ConfigService);

  await app.listen(config.get('port'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
