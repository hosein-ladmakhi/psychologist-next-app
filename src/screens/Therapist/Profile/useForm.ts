"use client";

import { useForm } from "react-hook-form";
import { TCreateOrEditOwnTherapistFormValidation } from "./index.type";
import { ITherapist } from "@/types/therapist.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrEditOwnTherapistFormValidation } from "./index.constant";

export const useProfileForm = (user: ITherapist) => {
  const { control, handleSubmit } = useForm<TCreateOrEditOwnTherapistFormValidation>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      phone2: user.phone2,
      address: user.address,
      bio: user.bio,
      degreeOfEducation: user.degreeOfEducation,
      workingFields: user.workingFields.map((workingField) => workingField.id),
      gender: user.gender,
      image: user.image,
    },
    resolver: zodResolver(createOrEditOwnTherapistFormValidation),
  });

  return { control, handleSubmit };
};
