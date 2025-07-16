import { MedicallyHistory } from './medical-history.model';

export const medicalHistoryProviders = [
  {
    provide: 'MEDICAL_HISTORY_REPOSITORY',
    useValue: MedicallyHistory,
  },
];
