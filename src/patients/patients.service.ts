import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Patient, PatientCreationAttrs } from './patients.model';
import { CreatePatientDto } from './dto/create-patient-dto';
import { PaginationPatientsDto } from './dto/pagination-patients.dto';
import { MedicalHistory, MedicalHistoryAttrs } from '../medical-history/medical-history.model';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Op, WhereOptions } from 'sequelize';

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
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      search,
      birthdayFrom,
      birthdayTo,
      allergic,
      chronicDisease,
      medication,
      skinDisease,
    } = paginationDto;

    const offset = (page - 1) * limit;

    const where: WhereOptions<PatientCreationAttrs> = {};
    const medicalWhere: WhereOptions<MedicalHistoryAttrs> = {};

    if (search) {
      where[Op.or] = [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { phoneNumber: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (birthdayFrom || birthdayTo) {
      where.birthday = {};
      if (birthdayFrom) where.birthday[Op.gte] = birthdayFrom;
      if (birthdayTo) where.birthday[Op.lte] = birthdayTo;
    }

    if (allergic) {
      medicalWhere.allergic = { [Op.contains]: [allergic] };
    }
    if (chronicDisease) {
      medicalWhere.chronicDiseases = { [Op.contains]: [chronicDisease] };
    }
    if (medication) {
      medicalWhere.takingMedication = { [Op.contains]: [medication] };
    }
    if (skinDisease) {
      medicalWhere.skinDiseases = { [Op.contains]: [skinDisease] };
    }

    const { rows: data, count: total } = await this.PatientRepository.findAndCountAll({
      where,
      offset,
      limit,
      order: [[sortBy, sortOrder]],
      include: [
        {
          model: MedicalHistory,
          as: 'medicalHistory',
          required: Object.keys(medicalWhere).length > 0,
          where: medicalWhere,
        },
      ],
    });

    return {
      data,
      total,
      page,
      limit,
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
