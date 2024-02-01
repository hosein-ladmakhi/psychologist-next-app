import { ICategory } from "@/types/category.model";
import { EDegtreeOfEducation, EGender, ETherapistScheduleType } from "@/types/therapist.model";

export const degreeOfEducationSelects = () => Object.entries(EDegtreeOfEducation).map(([key, value]) => ({ key, value }));

export const genderSelects = () => Object.entries(EGender).map(([key, value]) => ({ key, value }));

export const categoriesSelects = (categories: ICategory[]) => categories.map((category) => ({ key: category.enName, value: category.id }));

export const scheduleTypesSelects = () => Object.entries(ETherapistScheduleType).map(([key, value]) => ({ key, value }));
