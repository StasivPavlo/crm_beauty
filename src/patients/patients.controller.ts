import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Patient } from './patients.model';
import { PaginatedPatientsDto, PaginationDto } from './dto/pagination.dto';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private PatientService: PatientsService) {}

  @ApiOperation({ summary: 'Get Patient' })
  @ApiResponse({ status: 200, description: 'Get Patient with medical histories' })
  @Get(':id')
  getPatient(@Param('id', ParseIntPipe) id: number) {
    return this.PatientService.getPatient(id);
  }

  @ApiOperation({ summary: 'Get all Patients' })
  @ApiResponse({ status: 200, type: PaginatedPatientsDto })
  @Get()
  getAllPatients(@Query() paginationDto: PaginationDto) {
    return this.PatientService.findAll(paginationDto);
  }

  @ApiOperation({ summary: 'Create Patient' })
  @ApiResponse({ status: 200, type: Patient })
  @Post()
  createPatient(@Body() dto: CreatePatientDto) {
    return this.PatientService.createPatient(dto);
  }
}
