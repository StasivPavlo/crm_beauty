import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateMedicalHistoryDto } from './create-medical-history.dto';

export class UpdateMedicalHistoryDto extends PartialType(OmitType(CreateMedicalHistoryDto, ['patientId'])) {}
