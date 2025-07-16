import { MedicalHistoryService } from './medical-history.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Medical History')
@Controller('medical-history')
export class MedicalHistoryController {
  constructor(private MedicalHistoryService: MedicalHistoryService) {}

  @Post()
  createMedicalHistory(@Body() dto: CreateMedicalHistoryDto) {
    return this.MedicalHistoryService.createMedicalHistory(dto);
  }
}
