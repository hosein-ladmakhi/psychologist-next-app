import { FC, useEffect, useTransition } from 'react';
import {
  ICreateOrEditCategoryDialogProps,
  TCreateOrEditCategoryFormValidation,
} from './index.type';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import {
  UPSERT_CATEGORY_SUBJECT,
  createOrEditCategoryFormValidation,
} from './index.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createNewCategoryAction,
  editCategoryAction,
} from '@/app/(admin)/admin/categories/actions';
import Modal from '@/components/Modal';
import { Box, Button, CircularProgress, TextField } from '@mui/material';

const CreateOrEditCategoryDialog: FC<ICreateOrEditCategoryDialogProps> = ({
  onClose,
  selectedCategory,
}) => {
  const [pending, handleTransition] = useTransition();
  const { register, handleSubmit, formState, setValue } =
    useForm<TCreateOrEditCategoryFormValidation>({
      resolver: zodResolver(createOrEditCategoryFormValidation),
      defaultValues: {
        enName: '',
        faName: '',
      },
      criteriaMode: 'all',
      mode: 'all',
      reValidateMode: 'onBlur',
    });

  useEffect(() => {
    if (selectedCategory) {
      setValue('faName', selectedCategory?.faName);
      setValue('enName', selectedCategory?.enName);
    }

    return () => {
      setValue('faName', '');
      setValue('enName', '');
    };
  }, [selectedCategory]);

  const onCreateCategory = (data: TCreateOrEditCategoryFormValidation) => {
    createNewCategoryAction(data).then((res) => {
      if (res) {
        toast.success('New Category Created Successfully ...');
        onClose();
      } else {
        toast.error('Creating New Category Process has Failed ...');
      }
    });
  };

  const onEditCategory = (data: TCreateOrEditCategoryFormValidation) => {
    editCategoryAction(selectedCategory?.id!, data).then((res) => {
      if (res) {
        toast.success('Edit Category Finished Successfully ...');
        onClose();
      } else {
        toast.error('Edit Category Process has Failed ...');
      }
    });
  };

  const onCreateOrEditCategory = handleSubmit((data) => {
    handleTransition(() => {
      if (selectedCategory) onEditCategory(data);
      else onCreateCategory(data);
    });
  });

  const getFormError = (name: keyof TCreateOrEditCategoryFormValidation) =>
    formState.errors?.[name]?.message;

  const modalTitle = selectedCategory ? 'Edit Category' : 'Create New Category';

  return (
    <Modal title={modalTitle} size="lg" subject={UPSERT_CATEGORY_SUBJECT}>
      <form onSubmit={onCreateOrEditCategory}>
        <TextField
          {...register('faName')}
          fullWidth
          label="Farsi Name"
          placeholder="Enter Your Farsi Name"
          error={!!getFormError('faName')}
          helperText={getFormError('faName')}
          margin="dense"
        />
        <TextField
          {...register('enName')}
          fullWidth
          label="English Name"
          placeholder="Enter Your English Name"
          error={!!getFormError('enName')}
          helperText={getFormError('enName')}
          margin="dense"
        />
        <Box mt={4}>
          <Button type="submit" size="large" fullWidth>
            {pending ? (
              <CircularProgress size="1.5rem" color="inherit" />
            ) : (
              <>Submit</>
            )}
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default CreateOrEditCategoryDialog;
