"use client";

import { getSchedulesTherapistPerDay } from "@/services/therapist.service";
import { TTherapistSchedulesResPerDay } from "@/types/therapist.model";
import { useEffect, useState } from "react";

const useTherapistSchedulePerday = (therapistId: number) => {
  const [schedulesLoading, setSchedulesLoading] = useState<boolean>(false);
  const [schedules, setSchedules] = useState<TTherapistSchedulesResPerDay[]>([]);

  useEffect(() => {
    if (therapistId) {
      setSchedulesLoading(true);
      getSchedulesTherapistPerDay(therapistId)
        .then((data) => {
          setSchedules(data);
        })
        .finally(() => {
          setSchedulesLoading(false);
        });
    }
  }, [therapistId]);

  return { schedulesLoading, schedules };
};

export default useTherapistSchedulePerday;
