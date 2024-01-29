"use client";

import { ICity } from "@/types/location.model";
import { useEffect, useState } from "react";

const useCities = () => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [citiesLoading, setCitiesLoading] = useState<boolean>(false);

  useEffect(() => {
    setCitiesLoading(true);
    fetch("/cities.json")
      .then((res) => res.json())
      .then((cities: ICity[]) => {
        setCities(cities);
      })
      .finally(() => {
        setCitiesLoading(false);
      });
  }, []);

  return { cities, citiesLoading };
};

export default useCities;
