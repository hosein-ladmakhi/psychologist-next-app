import { useForm } from "react-hook-form";
import { TCreateOrEditTherapistFormValidation } from "./index.type";
import { createOrEditTherapistFormValidation } from "./index.constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { ITherapist } from "@/types/therapist.model";

export const useCreateOrEditTherapistForm = (selectedTherapist?: ITherapist) => {
  const { register, formState, handleSubmit, setValue, reset, control } = useForm<TCreateOrEditTherapistFormValidation>({
    resolver: zodResolver(createOrEditTherapistFormValidation),
  });

  useEffect(() => {
    if (selectedTherapist) {
      setValue("firstName", selectedTherapist?.firstName);
      setValue("lastName", selectedTherapist?.lastName);
      setValue("phone", selectedTherapist?.phone);
      setValue("phone2", selectedTherapist?.phone2);
      setValue("bio", selectedTherapist?.bio);
      setValue("address", selectedTherapist?.address);
      setValue("degreeOfEducation", selectedTherapist?.degreeOfEducation);
      setValue(
        "workingFields",
        selectedTherapist?.workingFields?.map((e) => e.id)
      );
    }

    return () => {
      reset();
    };
  }, [selectedTherapist]);

  return { register, formState, handleSubmit, control };
};
