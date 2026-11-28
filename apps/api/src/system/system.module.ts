import { Module } from '@nestjs/common';
import { CacheModule } from '../cache/cache.module';
import { SystemController } from './system.controller';
@Module({ imports: [CacheModule], controllers: [SystemController] })
export class SystemModule {}
