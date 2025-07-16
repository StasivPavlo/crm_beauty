import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Patient } from './patients.model';
import { CreatePatientDto } from './dto/create-patient-dto';
import { PaginationDto } from './dto/pagination.dto';
import { MedicallyHistory } from '../medical-history/medical-history.model';

@Injectable()
export class PatientsService {
  constructor(
    @Inject('PATIENTS_REPOSITORY')
    private PatientRepository: typeof Patient,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const offset = (page - 1) * limit;

    const { rows: data, count: total } = await this.PatientRepository.findAndCountAll({
      offset,
      limit: limit,
      order: [['createdAt', 'DESC']],
    });

    return {
      data,
      total,
      page: page,
      limit: limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getPatient(id: number) {
    const patient = await this.PatientRepository.findOne({ where: { id }, include: MedicallyHistory });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient;
  }

  async isPhoneNumberTaken(phoneNumber: string) {
    const count = await this.PatientRepository.count({ where: { phoneNumber } });

    return count > 0;
  }

  async createPatient(data: CreatePatientDto) {
    const exist = await this.isPhoneNumberTaken(data.phoneNumber);

    if (exist) {
      throw new BadRequestException('Phone number already exists');
    }

    return this.PatientRepository.create({
      ...data,
      birthday: new Date(data.birthday),
    });
  }
}
