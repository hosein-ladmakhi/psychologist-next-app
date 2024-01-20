import { httpGet } from '@/api';
import { API_URL } from '@/constants';
import { TTherapistsPageRes } from '@/types/therapist.model';
import { prepareQueryParams } from '@/utils/prepareQueryParams';

export const getTherapists = (filterObject: Object) =>
  httpGet<TTherapistsPageRes>(
    `${API_URL}/therapist${prepareQueryParams(filterObject)}`,
  );
