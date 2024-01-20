import { PropsWithChildren } from 'react';
import { modalWidthSize } from './index.constant';

export interface IModalProps extends PropsWithChildren {
  subject: string;
  size?: keyof typeof modalWidthSize;
  title: string;
}
