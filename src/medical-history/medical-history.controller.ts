import { MedicalHistoryService } from './medical-history.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MedicalHistory } from './medical-history.model';
import { UpdateMedicalHistoryDto } from './dto/update-medical-history';

@ApiTags('Medical History')
@Controller('medical-history')
export class MedicalHistoryController {
  constructor(private MedicalHistoryService: MedicalHistoryService) {}

  @ApiOperation({ summary: 'Get medical history by patient id' })
  @ApiResponse({ status: 200, type: MedicalHistory })
  @Get(':patientId')
  getMedicalHistoryByPatientId(@Param('patientId', ParseIntPipe) patientId: number) {
    return this.MedicalHistoryService.getMedicalHistoryByPatientId(patientId);
  }

  @ApiOperation({ summary: 'Create medical history for patient' })
  @ApiResponse({ status: 200, type: MedicalHistory })
  @Post()
  createMedicalHistory(@Body() dto: CreateMedicalHistoryDto) {
    return this.MedicalHistoryService.createMedicalHistory(dto);
  }

  @ApiOperation({ summary: 'Update medical history for patient' })
  @ApiResponse({ status: 200, type: MedicalHistory })
  @Patch(':patientId')
  updateMedicalHistory(@Param('patientId', ParseIntPipe) patientId: number, @Body() dto: UpdateMedicalHistoryDto) {
    return this.MedicalHistoryService.updateMedicalHistory(patientId, dto);
  }

  @ApiOperation({ summary: 'Delete medical history of patient' })
  @ApiResponse({ status: 204 })
  @Delete(':patientId')
  deleteMedicalHistory(@Param('patientId') patientId: number) {
    return this.MedicalHistoryService.deleteMedicalHistory(patientId);
  }
}
