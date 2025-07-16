import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MedicallyHistory } from './medical-history.model';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { PatientsService } from '../patients/patients.service';

@Injectable()
export class MedicalHistoryService {
  constructor(
    @Inject('MEDICAL_HISTORY_REPOSITORY')
    private MedicalHistoryRepository: typeof MedicallyHistory,
    private readonly PatientService: PatientsService,
  ) {}

  async createMedicalHistory(CreateMedicalHistoryDto: CreateMedicalHistoryDto) {
    const { patientId } = CreateMedicalHistoryDto;

    const patient = await this.PatientService.getPatient(patientId);

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return this.MedicalHistoryRepository.create(CreateMedicalHistoryDto);
  }
}
