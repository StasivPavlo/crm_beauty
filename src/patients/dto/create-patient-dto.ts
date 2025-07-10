import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsMobilePhone, IsString, Length } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({ example: 'Pavlo', description: 'Patient first name' })
  @IsString()
  @Length(3, 20)
  readonly firstName: string;

  @ApiProperty({ example: 'Stasiv', description: 'Patient last name' })
  @IsString()
  @Length(3, 20)
  readonly lastName: string;

  @ApiProperty({
    example: '2004-09-21T10:00:00Z',
    description: 'Patient birthday',
  })
  @IsDateString()
  readonly birthday: string;

  @ApiProperty({
    example: '+380552159315',
    description: 'Patient phone number',
  })
  @IsMobilePhone('uk-UA')
  readonly phoneNumber: string;

  @ApiProperty({
    example: 'pavlostasiv@gmail.com',
    description: 'Patient email',
  })
  @IsEmail()
  readonly email: string;
}
