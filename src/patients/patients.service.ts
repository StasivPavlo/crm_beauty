import { Inject, Injectable } from '@nestjs/common';
import { Patient } from './patients.model';
import { CreatePatientDto } from './dto/create-patient-dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class PatientsService {
  constructor(
    @Inject('PATIENTS_REPOSITORY')
    private PatientRepository: typeof Patient,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const { page = '1', limit = '10' } = paginationDto;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const offset = (pageNumber - 1) * limitNumber;

    const { rows: data, count: total } = await this.PatientRepository.findAndCountAll({
      offset,
      limit: limitNumber,
      order: [['createdAt', 'DESC']],
    });

    return {
      data,
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    };
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
