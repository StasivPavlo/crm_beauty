import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { MedicalHistory } from '../medical-history/medical-history.model';

export interface PatientCreationAttrs {
  firstName: string;
  lastName: string;
  birthday: Date;
  phoneNumber: string;
  email: string;
}

@Table({ tableName: 'patients' })
export class Patient extends Model<Patient, PatientCreationAttrs> {
  @ApiProperty({ example: 1, description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 'Pavlo', description: 'Patient first name' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare firstName: string;

  @ApiProperty({ example: 'Stasiv', description: 'Patient last name' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare lastName: string;

  @ApiProperty({
    example: '2004-09-21T10:00:00Z',
    description: 'Patient birthday',
  })
  @Column({ type: DataType.DATE, allowNull: false })
  declare birthday: Date;

  @ApiProperty({
    example: '+380552159315',
    description: 'Patient phone number',
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare phoneNumber: string;

  @ApiProperty({
    example: 'pavlostasiv@gmail.com',
    description: 'Patient email',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare email: string;

  @HasOne(() => MedicalHistory)
  medicalHistory: MedicalHistory;
}
