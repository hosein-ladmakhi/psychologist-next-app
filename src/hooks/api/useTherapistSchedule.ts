"use client";

import { getSchedulesTherapist } from "@/services/therapist.service";
import { ITherapistSchedules } from "@/types/therapist.model";
import { useEffect, useState } from "react";

const useTherapistSchedule = (therapistId: number, limit: number) => {
  const [therapistSchedules, setTherapistSchedules] = useState<ITherapistSchedules[]>([]);
  const [therapistSchedulesCount, setTherapistSchedulesCount] = useState<number>(0);
  const [therapistSchedulesLoading, setTherapistSchedulesLoading] = useState<boolean>(false);

  useEffect(() => {
    setTherapistSchedulesLoading(true);
    getSchedulesTherapist(therapistId, { limit })
      .then(({ content, count }) => {
        setTherapistSchedules(content);
        setTherapistSchedulesCount(count);
      })
      .finally(() => {
        setTherapistSchedulesLoading(false);
      });
  }, [therapistId]);

  return {
    therapistSchedules,
    therapistSchedulesCount,
    therapistSchedulesLoading,
  };
};

export default useTherapistSchedule;
