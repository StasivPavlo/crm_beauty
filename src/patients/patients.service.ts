import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Patient } from './patients.model';
import { CreatePatientDto } from './dto/create-patient-dto';
import { PaginationPatientsDto } from './dto/pagination-patients.dto';
import { MedicalHistory } from '../medical-history/medical-history.model';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @Inject('PATIENTS_REPOSITORY')
    private PatientRepository: typeof Patient,
  ) {}

  async checkIsPhoneNumberExist(phoneNumber: string) {
    const count = await this.PatientRepository.count({ where: { phoneNumber } });

    if (count) {
      throw new ConflictException('The phone number is already taken');
    }
  }

  async getPatientById(id: number) {
    const patient = await this.PatientRepository.findByPk(id);

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient;
  }

  async findAll(paginationDto: PaginationPatientsDto) {
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

  async getPatientWithMedicalHistory(id: number) {
    const patient = await this.PatientRepository.findByPk(id, { include: MedicalHistory });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient;
  }

  async createPatient(dto: CreatePatientDto) {
    await this.checkIsPhoneNumberExist(dto.phoneNumber);

    return this.PatientRepository.create({
      ...dto,
      birthday: new Date(dto.birthday),
    });
  }

  async updatePatient(id: number, dto: UpdatePatientDto) {
    const patient = await this.getPatientById(id);

    if (dto.phoneNumber) {
      await this.checkIsPhoneNumberExist(dto.phoneNumber);
    }

    const birthday = dto.birthday ? new Date(dto.birthday) : undefined;

    return patient.update({ ...dto, birthday });
  }

  async deletePatient(id: number) {
    const patient = await this.getPatientById(id);

    await patient.destroy();
  }
}
