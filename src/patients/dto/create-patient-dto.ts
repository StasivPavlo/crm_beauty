import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({ example: 'Pavlo', description: 'Patient first name' })
  readonly firstName: string;

  @ApiProperty({ example: 'Stasiv', description: 'Patient last name' })
  readonly lastName: string;

  @ApiProperty({
    example: '2004-09-21T10:00:00Z',
    description: 'Patient birthday',
  })
  readonly birthday: string;

  @ApiProperty({
    example: '+380552159315',
    description: 'Patient phone number',
  })
  readonly phoneNumber: string;

  @ApiProperty({
    example: 'pavlostasiv@gmail.com',
    description: 'Patient email',
  })
  readonly email: string;
}
