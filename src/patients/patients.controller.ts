import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Patient } from './patients.model';
import { PaginatedPatientsDto, PaginationPatientsDto } from './dto/pagination-patients.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private PatientService: PatientsService) {}

  @ApiOperation({ summary: 'Get all Patients' })
  @ApiResponse({ status: 200, type: PaginatedPatientsDto })
  @Get()
  getAllPatients(@Query() paginationDto: PaginationPatientsDto) {
    return this.PatientService.findAll(paginationDto);
  }

  @ApiOperation({ summary: 'Get Patient' })
  @ApiResponse({ status: 200, description: 'Get Patient with medical histories' })
  @Get(':id')
  getPatient(@Param('id', ParseIntPipe) id: number) {
    return this.PatientService.getPatientWithMedicalHistory(id);
  }

  @ApiOperation({ summary: 'Create Patient' })
  @ApiResponse({ status: 200, type: Patient })
  @Post()
  createPatient(@Body() dto: CreatePatientDto) {
    return this.PatientService.createPatient(dto);
  }

  @ApiOperation({ summary: 'Update Patient' })
  @ApiResponse({ status: 200, type: Patient })
  @Patch(':id')
  updatePatient(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePatientDto) {
    return this.PatientService.updatePatient(id, dto);
  }

  @ApiOperation({ summary: 'Delete Patient' })
  @ApiResponse({ status: 204, type: Patient })
  @Delete(':id')
  @HttpCode(204)
  deletePatient(@Param('id', ParseIntPipe) id: number) {
    return this.PatientService.deletePatient(id);
  }
}
