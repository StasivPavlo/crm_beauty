import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MedicalHistory } from './medical-history.model';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { PatientsService } from '../patients/patients.service';
import { UpdateMedicalHistoryDto } from './dto/update-medical-history';

@Injectable()
export class MedicalHistoryService {
  constructor(
    @Inject('MEDICAL_HISTORY_REPOSITORY')
    private MedicalHistoryRepository: typeof MedicalHistory,
    private readonly PatientService: PatientsService,
  ) {}

  async getMedicalHistoryByPatientId(patientId: number) {
    const medicalHistory = await this.MedicalHistoryRepository.findOne({ where: { id: patientId } });

    if (!medicalHistory) {
      throw new NotFoundException('Patient does not have medical history');
    }

    return medicalHistory;
  }

  async createMedicalHistory(dto: CreateMedicalHistoryDto) {
    await this.PatientService.getPatientById(dto.patientId);

    return this.MedicalHistoryRepository.create(dto);
  }

  async updateMedicalHistory(patientId: number, dto: UpdateMedicalHistoryDto) {
    await this.PatientService.getPatientById(patientId);

    const medicalHistory = await this.getMedicalHistoryByPatientId(patientId);

    return await medicalHistory.update(dto);
  }

  async deleteMedicalHistory(patientId: number) {
    await this.PatientService.getPatientById(patientId);
    await this.MedicalHistoryRepository.destroy({ where: { id: patientId } });
  }
}
