"use client";

import { getLocations } from "@/services/location.service";
import { ILocation } from "@/types/location.model";
import { useEffect, useState } from "react";

const useLocations = (limit: number) => {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [locationsCount, setLocationsCount] = useState<number>(0);
  const [locationsLoading, setLocationsLoading] = useState<boolean>(false);

  useEffect(() => {
    setLocationsLoading(true);
    getLocations({ limit })
      .then((data) => {
        setLocations(data?.content);
        setLocationsCount(data?.count);
      })
      .finally(() => {
        setLocationsLoading(false);
      });
  }, [limit]);

  return { locations, locationsLoading, locationsCount };
};

export default useLocations;
