import { ICategory } from "@/types/category.model";
import { EOrderStatus } from "@/types/order.model";
import { IPatient } from "@/types/patient.model";
import { EDegtreeOfEducation, EGender, ETherapistScheduleType, ITherapistSchedules } from "@/types/therapist.model";

export const degreeOfEducationSelects = () => Object.entries(EDegtreeOfEducation).map(([key, value]) => ({ key, value }));

export const genderSelects = () => Object.entries(EGender).map(([key, value]) => ({ key, value }));

export const categoriesSelects = (categories: ICategory[]) => categories.map((category) => ({ key: category.enName, value: category.id }));

export const scheduleTypesSelects = () => Object.entries(ETherapistScheduleType).map(([key, value]) => ({ key, value }));

export const patientsSelects = (patients: IPatient[]) =>
  patients.map((patient) => ({ key: `${patient.firstName} ${patient.lastName}`, value: patient.id }));

export const orderLocationSelects = (locations: string[]) => locations.map((location) => ({ key: location, value: location }));

export const orderStatusSelects = () => Object.entries(EOrderStatus).map(([key, value]) => ({ key, value }));

export const orderTypeSelects = () => Object.entries(ETherapistScheduleType).map(([key, value]) => ({ key, value }));

export const scheduleLocationSelects = (schedules: ITherapistSchedules[]) =>
  schedules.map((schedule) => ({ key: `${schedule.location.city} - ${schedule.location.address}`, value: schedule.location.id }));

export const scheduleRoomSelects = (schedules: ITherapistSchedules[]) =>
  schedules.map((schedule) => ({ key: `Room ${schedule.room}`, value: schedule.room }));
