import { Inject, Injectable } from '@nestjs/common';
import { Patient } from './patients.model';
import { CreatePatientDto } from './dto/create-patient-dto';

@Injectable()
export class PatientsService {
  constructor(
    @Inject('PATIENTS_REPOSITORY')
    private PatientRepository: typeof Patient,
  ) {}

  getAllPatients() {
    return this.PatientRepository.findAll<Patient>();
  }

  getPatient(id: number) {
    return this.PatientRepository.findByPk<Patient>(id);
  }

  createPatient(data: CreatePatientDto) {
    return this.PatientRepository.create({
      ...data,
      birthday: new Date(data.birthday),
    });
  }
}
