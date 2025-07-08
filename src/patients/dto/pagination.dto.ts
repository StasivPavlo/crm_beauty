import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Patient } from '../patients.model';

export class PaginationDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number' })
  readonly page?: string;

  @ApiPropertyOptional({ example: 10, description: 'Count of rows on page' })
  readonly limit?: string;
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
