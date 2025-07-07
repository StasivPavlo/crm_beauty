import { Patient } from './patients.model';

export const patientsProviders = [
  {
    provide: 'PATIENTS_REPOSITORY',
    useValue: Patient,
  },
];
