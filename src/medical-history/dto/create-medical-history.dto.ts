import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString } from 'class-validator';

export class CreateMedicalHistoryDto {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the patient (referencing the patient table)',
  })
  @Type(() => Number)
  @IsInt()
  readonly patientId: number;

  @ApiProperty({
    example: ['Pollen', 'Peanuts', 'Penicillin'],
    description: 'List of known allergies the patient has',
  })
  @IsArray()
  @IsString({ each: true })
  readonly allergic: string[];

  @ApiProperty({
    example: ['Hypertension', 'Asthma'],
    description: 'List of chronic conditions the patient is diagnosed with',
  })
  @IsArray()
  @IsString({ each: true })
  readonly chronicDiseases: string[];

  @ApiProperty({
    example: ['Ibuprofen', 'Insulin'],
    description: 'List of medications the patient is currently taking',
  })
  @IsArray()
  @IsString({ each: true })
  readonly takingMedication: string[];

  @ApiProperty({
    example: ['Acne', 'Eczema'],
    description: 'List of skin-related conditions the patient has',
  })
  @IsArray()
  @IsString({ each: true })
  readonly skinDiseases: string[];
}
