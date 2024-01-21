'use server';

import {
  createTherapist,
  deleteTherapist,
  editTherapist,
} from '@/services/therapist.service';
import {
  EDegtreeOfEducation,
  EGender,
  ICreateOrEditTherapistReqBody,
} from '@/types/therapist.model';
import { revalidateTag } from 'next/cache';

export const createTherapistAction = async (
  data: ICreateOrEditTherapistReqBody,
): Promise<boolean> => {
  try {
    const createdTherapist = await createTherapist(data);
    if (!createdTherapist?.id) {
      return false;
    }
    revalidateTag('therapists');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const editTherapistAction = async (
  id: number,
  data: ICreateOrEditTherapistReqBody,
) => {
  try {
    const updatedTherapist = await editTherapist(id, data);
    if (!updatedTherapist?.id) {
      return false;
    }
    revalidateTag('therapists');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteTherapistAction = async (id: number) => {
  try {
    const deletedTherapist = await deleteTherapist(id);
    console.log(deletedTherapist);
    if (!deletedTherapist) {
      return false;
    }
    revalidateTag('therapists');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
