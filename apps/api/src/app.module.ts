import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import type { Request } from 'express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SystemModule } from './system/system.module';
import { apiEnv } from './config/api-env';
import { isVersionedApi } from './common/http-context';

@Module({
  imports: [DatabaseModule, SystemModule, ThrottlerModule.forRootAsync({
    useFactory: () => {
      const env = apiEnv();
      return {
        throttlers: [{ ttl: env.rateTtl, limit: env.rateLimit }],
        skipIf: (ctx) => !isVersionedApi(ctx.switchToHttp().getRequest<Request>()),
      };
    },
  })],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
