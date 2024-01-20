import { TAppSelector } from '@/store/index.type';
import { useSelector } from 'react-redux';

export const useStoreSelector = <T>(selector: TAppSelector<T>) =>
  useSelector(selector);
