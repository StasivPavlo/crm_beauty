import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsIn, Min, IsDateString } from 'class-validator';
import { Patient } from '../patients.model';

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

  @ApiPropertyOptional({ example: 'createdAt', description: 'Field to sort by' })
  @IsOptional()
  @IsString()
  readonly sortBy?: string = 'createdAt';

  @ApiPropertyOptional({ example: 'DESC', description: 'Sort order ASC|DESC' })
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  readonly sortOrder?: 'ASC' | 'DESC' = 'DESC';

  @ApiPropertyOptional({ example: 'john', description: 'Search by name/email/phone' })
  @IsOptional()
  @IsString()
  readonly search?: string;

  @ApiPropertyOptional({ example: '1980-01-01', description: 'Birthday from (inclusive)' })
  @IsOptional()
  @IsDateString()
  readonly birthdayFrom?: string;

  @ApiPropertyOptional({ example: '2000-12-31', description: 'Birthday to (inclusive)' })
  @IsOptional()
  @IsDateString()
  readonly birthdayTo?: string;

  // 🔹 Нові фільтри по medicalHistory
  @ApiPropertyOptional({ example: 'penicillin', description: 'Filter by allergy' })
  @IsOptional()
  @IsString()
  readonly allergic?: string;

  @ApiPropertyOptional({ example: 'asthma', description: 'Filter by chronic disease' })
  @IsOptional()
  @IsString()
  readonly chronicDisease?: string;

  @ApiPropertyOptional({ example: 'aspirin', description: 'Filter by medication' })
  @IsOptional()
  @IsString()
  readonly medication?: string;

  @ApiPropertyOptional({ example: 'eczema', description: 'Filter by skin disease' })
  @IsOptional()
  @IsString()
  readonly skinDisease?: string;
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
