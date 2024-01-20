import { TAppDispatch } from '@/store/index.type';
import { useDispatch } from 'react-redux';

export const useStoreDispatch = () => useDispatch() as TAppDispatch;
