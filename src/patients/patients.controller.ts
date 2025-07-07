import { Body, Controller, Get, Post } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Patient } from './patients.model';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private PatientService: PatientsService) {}

  @ApiOperation({ summary: 'Get all Patients' })
  @ApiResponse({ status: 200, type: [Patient] })
  @Get()
  getAllPatients() {
    return this.PatientService.getAllPatients();
  }

  @ApiOperation({ summary: 'Create Patient' })
  @ApiResponse({ status: 200, type: Patient })
  @Post()
  createPatient(@Body() dto: CreatePatientDto) {
    console.log(dto);
    return this.PatientService.createPatient(dto);
  }
}
