import { deletePatientById } from '@/services/patient.service';
import { IPatient } from '@/types/patient.model';
import { revalidateTag } from 'next/cache';
import toast from 'react-hot-toast';

export const deletePatientAction = async (patient: IPatient) => {
  const fullName = `${patient.firstName} ${patient.lastName}`;
  try {
    const res = await deletePatientById(patient.id);
    if (res?.id) {
      console.log('failed ...', res);
      toast.success(`${fullName} Deleted Successfully`);
      revalidateTag('patients');
      return true;
    }
    throw new Error();
  } catch (error) {
    console.log('failed 54');
    toast.error(
      `Some Activites Saved By ${fullName}, Delete Them And Try Again`,
    );
    return false;
  }
};
