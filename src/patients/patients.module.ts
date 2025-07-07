import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PatientsService } from './patients.service';
import { patientsProviders } from './patients.providers';
import { PatientsController } from './patients.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PatientsController],
  providers: [PatientsService, ...patientsProviders],
})
export class PatientsModule {}
