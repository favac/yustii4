// Libraries
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Modules
import { ApiModule } from './modules/api.module';
import { AuthModule } from './modules/auth/auth.module';

// DB connection
import { connection } from 'yustii-backend-common/dist/models';

// Healthcheck controller
import { HealthcheckController } from './healthcheck.controller';

// Constans
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    connection,
    AuthModule,
    ApiModule,
  ],
  controllers: [HealthcheckController],
})
export class AppModule {}
