import { useForm } from "react-hook-form";
import { TCreateOrEditPatientFormValidation } from "./index.type";
import { createOrEditPatientFormValidation } from "./index.constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { IPatient } from "@/types/patient.model";

export const useCreateOrEditPatientForm = (selectedPatient?: IPatient) => {
  const { control, setValue, handleSubmit, reset } = useForm<TCreateOrEditPatientFormValidation>({
    resolver: zodResolver(createOrEditPatientFormValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
    criteriaMode: "all",
    mode: "all",
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    if (selectedPatient) {
      setValue("firstName", selectedPatient?.firstName);
      setValue("lastName", selectedPatient?.lastName);
      setValue("phone", selectedPatient?.phone);
    } else {
      reset();
    }

    return () => {
      reset();
    };
  }, [selectedPatient]);

  return { control, handleSubmit };
};
