import zod from 'zod'
import { editPasswordFormValidation } from './index.constant'
import { FC } from 'react';

export type TEditPasswordFormValidation = zod.infer<typeof editPasswordFormValidation>

interface IEditPasswordDialogProps {
    type: string;
    id: number;
    handleClose: () => void
}

export type TEditPasswordDialogFC = FC<IEditPasswordDialogProps>