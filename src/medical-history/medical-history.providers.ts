import { MedicalHistory } from './medical-history.model';

export const medicalHistoryProviders = [
  {
    provide: 'MEDICAL_HISTORY_REPOSITORY',
    useValue: MedicalHistory,
  },
];
