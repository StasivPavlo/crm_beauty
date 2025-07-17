import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Patient } from '../patients.model';
import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationPatientsDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly page: number = 1;

  @ApiPropertyOptional({ example: 10, description: 'Count of rows on page' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly limit: number = 10;
}

export class PaginatedPatientsDto {
  @ApiProperty({ type: [Patient] })
  data: Patient[];

  @ApiProperty({ example: 100, description: 'Total count of rows' })
  total: number;

  @ApiProperty({ example: 1, description: 'Current page' })
  page: number;

  @ApiProperty({ example: 10, description: 'Count of rows on page' })
  limit: number;

  @ApiProperty({ example: 10, description: 'Count of pages relative to the limit' })
  totalPages: number;
}
