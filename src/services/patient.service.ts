import { httpDelete, httpGet } from '@/api';
import { API_URL } from '@/constants';
import { IPatient, IPatientPageRes } from '@/types/patient.model';

export const getPatientsPageApi = (currentPage: number = 1) =>
  httpGet<IPatientPageRes>(
    `${API_URL}/patient?page=${currentPage - 1}`,
    undefined,
    ['patients'],
  );

export const deletePatientById = (id: number) =>
  httpDelete<IPatient>(`${API_URL}/patient/${id}`);
