import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '../patients/patients.model';

interface MedicalHistoryAttrs {
  patientId: number;
  allergic: string[];
  chronicDiseases: string[];
  takingMedication: string[];
  skinDiseases: string[];
}

@Table({ tableName: 'medical-history' })
export class MedicalHistory extends Model<MedicalHistory, MedicalHistoryAttrs> {
  @ApiProperty({ example: 1, description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 1, description: 'unique identifier of patient' })
  @ForeignKey(() => Patient)
  @Column({ unique: true })
  patientId: number;

  @ApiProperty({ example: ['lorem', 'ipsum'], description: 'allergy list' })
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  declare allergic: string[];

  @ApiProperty({ example: ['lorem', 'ipsum'], description: 'list of chronic diseases' })
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  declare chronicDiseases: string[];

  @ApiProperty({ example: ['lorem', 'ipsum'], description: 'list of medicaments' })
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  declare takingMedication: string[];

  @ApiProperty({ example: ['lorem', 'ipsum'], description: 'list of skin diseases' })
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  declare skinDiseases: string[];

  @BelongsTo(() => Patient, {
    onDelete: 'CASCADE',
  })
  patient: Patient[];
}
