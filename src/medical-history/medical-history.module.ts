import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { medicalHistoryProviders } from './medical-history.providers';
import { MedicalHistoryService } from './medical-history.service';
import { PatientsModule } from '../patients/patients.module';
import { MedicalHistoryController } from './medical-history.controller';

@Module({
  imports: [DatabaseModule, PatientsModule],
  controllers: [MedicalHistoryController],
  providers: [MedicalHistoryService, ...medicalHistoryProviders],
})
export class MedicalHistoryModule {}
