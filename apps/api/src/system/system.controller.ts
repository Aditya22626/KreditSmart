import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CacheService } from '../cache/cache.service';
import { StatusQueryDto } from './status-query.dto';

@ApiTags('System')
@Controller({ path: 'system', version: '1' })
export class SystemController {
  constructor(private readonly cache: CacheService) {}
  @Get('status')
  @ApiOperation({ summary: 'Application status (full includes cache connectivity)' })
  async status(@Query() query: StatusQueryDto) {
    const basic = { service: 'kreditsmart-api', status: 'ok', version: '1' };
    if (query.detail !== 'full') return basic;
    return { ...basic, cache: await this.cache.ping() ? 'up' : 'down' };
  }
}
