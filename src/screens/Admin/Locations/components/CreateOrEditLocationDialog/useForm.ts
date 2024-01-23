import { ILocation } from "@/types/location.model";
import { useForm } from "react-hook-form";
import { TCreateOrEditLocationFormValidation } from "./index.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrEditLocationFormValidation } from "./index.constant";
import { useEffect } from "react";

export const useCreateOrEditLocationForm = (selectedLocation?: ILocation) => {
  const { handleSubmit, setValue, reset, control } = useForm<TCreateOrEditLocationFormValidation>({
    resolver: zodResolver(createOrEditLocationFormValidation),
    criteriaMode: "all",
    mode: "all",
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    if (selectedLocation) {
      setValue("city", selectedLocation?.city);
      setValue("address", selectedLocation?.address);
    }

    return () => {
      reset();
    };
  }, [selectedLocation]);

  return { handleSubmit, control };
};
