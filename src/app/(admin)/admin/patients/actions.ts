'use server';

import {
  createPatient,
  deletePatientById,
  editPatient,
} from '@/services/patient.service';
import { TCreateOrEditPatientBody, IPatient } from '@/types/patient.model';
import { revalidateTag } from 'next/cache';

export const deletePatientAction = async (patient: IPatient) => {
  const res = await deletePatientById(patient.id);
  if (res) {
    revalidateTag('patients');
    return true;
  }
  return false;
};

export const createNewPatientAction = async (
  requestBody: TCreateOrEditPatientBody,
) => {
  const res = await createPatient(requestBody);
  if (res?.id) {
    revalidateTag('patients');
    return true;
  }
  return false;
};

export const editPatientAction = async (
  id: number,
  requestBody: TCreateOrEditPatientBody,
) => {
  const res = await editPatient(id, requestBody);
  if (res?.id) {
    revalidateTag('patients');
    return true;
  }
  return false;
};
