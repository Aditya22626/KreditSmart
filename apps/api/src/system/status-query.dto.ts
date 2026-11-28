import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
export class StatusQueryDto {
  @ApiPropertyOptional({ enum: ['basic', 'full'], default: 'basic' })
  @IsOptional()
  @IsIn(['basic', 'full'])
  detail?: 'basic' | 'full';
}
