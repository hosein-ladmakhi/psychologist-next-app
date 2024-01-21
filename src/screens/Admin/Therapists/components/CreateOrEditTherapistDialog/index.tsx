import {
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import {
  ICreateOrEditTherapistDialogProps,
  TCreateOrEditTherapistFormValidation,
} from './index.type';
import Modal from '@/components/Modal';
import {
  UPSERT_THERAPIST_DIALOG_SUBJECT,
  createOrEditTherapistFormValidation,
} from './index.constant';
import ImagePicker from '@/components/ImagePicker';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EDegtreeOfEducation,
  EGender,
  ICreateOrEditTherapistReqBody,
} from '@/types/therapist.model';
import { ICategory } from '@/types/category.model';
import { getCategories } from '@/services/category.service';
import toast from 'react-hot-toast';
import { uploadTherapistProfile } from '@/services/therapist.service';
import {
  createTherapistAction,
  editTherapistAction,
} from '@/app/(admin)/admin/therapists/actions';
import { API_URL } from '@/constants';

const CreateOrEditTherapistDialog: FC<ICreateOrEditTherapistDialogProps> = ({
  onClose,
  selectedTherapist,
}) => {
  const [createOrEditLoading, handleCreateOrEditTransition] = useTransition();
  const [workingFields, setWorkingFields] = useState<ICategory[]>([]);
  const imageRef = useRef<File>(null);
  const [workingFieldsLoading, setWorkingFieldsLoading] =
    useState<boolean>(false);

  useEffect(() => {
    setWorkingFieldsLoading(true);
    getCategories({ limit: 10000 })
      .then((res) => setWorkingFields(res.content))
      .finally(() => {
        setWorkingFieldsLoading(false);
      });
  }, []);

  const { register, formState, handleSubmit, setValue, reset } =
    useForm<TCreateOrEditTherapistFormValidation>({
      resolver: zodResolver(createOrEditTherapistFormValidation),
    });

  useEffect(() => {
    if (selectedTherapist) {
      setValue('firstName', selectedTherapist?.firstName);
      setValue('lastName', selectedTherapist?.lastName);
      setValue('phone', selectedTherapist?.phone);
      setValue('phone2', selectedTherapist?.phone2);
      setValue('bio', selectedTherapist?.bio);
      setValue('address', selectedTherapist?.address);
      setValue('degreeOfEducation', selectedTherapist?.degreeOfEducation);
      setValue(
        'workingFields',
        selectedTherapist?.workingFields?.map((e) => e.id),
      );
    }

    return () => {
      reset();
    };
  }, [selectedTherapist]);

  const modalTitle = selectedTherapist
    ? 'Edit Therapist'
    : 'Create New Therapist';

  const getFormError = (name: keyof TCreateOrEditTherapistFormValidation) =>
    formState.errors?.[name]?.message;

  const handleUploadProfile = () => {
    const formdata = new FormData();
    formdata.append('image', imageRef?.current as any);
    return uploadTherapistProfile(formdata);
  };

  const handleCreate = async (data: TCreateOrEditTherapistFormValidation) => {
    if (!imageRef?.current) {
      toast.error('You Must Select Your Profile Image');
      return;
    }
    const uploadedFile = await handleUploadProfile();
    if (!uploadedFile) {
      toast.error('Your Profile Image Not Uploaded Try Again');
      return;
    }

    createTherapistAction({
      ...data,
      image: uploadedFile?.filePath!,
      gender: data.gender ? EGender.female : EGender.male,
      degreeOfEducation: data.degreeOfEducation as EDegtreeOfEducation,
    })
      .then((res) => {
        if (res) {
          toast.success('Therapist Created ...');
          onClose();
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        toast.error('Therapist Not Created ...');
      });
  };

  const handleEdit = async (data: TCreateOrEditTherapistFormValidation) => {
    const reqBody: Partial<ICreateOrEditTherapistReqBody> = {
      ...data,
      gender: data.gender ? EGender.female : EGender.male,
      degreeOfEducation: data.degreeOfEducation as EDegtreeOfEducation,
    };
    if (imageRef?.current) {
      const uploadedFile = await handleUploadProfile();
      if (!uploadedFile) {
        toast.error('Your Profile Image Not Uploaded Try Again');
        return;
      } else {
        reqBody.image = uploadedFile?.filePath;
      }
    }

    editTherapistAction(
      selectedTherapist?.id!,
      reqBody as ICreateOrEditTherapistReqBody,
    )
      .then((res) => {
        if (res) {
          toast.success('Therapist Updated ...');
          onClose();
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        toast.error('Therapist Not Updated ...');
      });
  };

  const onSubmit = handleSubmit((data) => {
    handleCreateOrEditTransition(async () => {
      if (selectedTherapist) {
        handleEdit(data);
      } else {
        handleCreate(data);
      }
    });
  });

  return (
    <Modal
      subject={UPSERT_THERAPIST_DIALOG_SUBJECT}
      title={modalTitle}
      size="xl"
    >
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <Box component="center">
              <ImagePicker
                defaultSrc={
                  selectedTherapist?.image
                    ? `${API_URL}${selectedTherapist?.image}`
                    : undefined
                }
                ref={imageRef}
                height={100}
                width={100}
              />
            </Box>
          </Grid>
          <Grid item lg={6}>
            <TextField
              {...register('firstName')}
              fullWidth
              label="First Name"
              error={!!getFormError('firstName')}
              helperText={getFormError('firstName')}
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              error={!!getFormError('lastName')}
              helperText={getFormError('lastName')}
              {...register('lastName')}
              fullWidth
              label="Last Name"
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              error={!!getFormError('phone')}
              helperText={getFormError('phone')}
              {...register('phone')}
              fullWidth
              label="Phone Number 1"
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              error={!!getFormError('phone2')}
              helperText={getFormError('phone2')}
              {...register('phone2')}
              fullWidth
              label="Phone Number 2"
            />
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth>
              <InputLabel id="degree-of-education-label">
                Degree Of Education
              </InputLabel>
              <Select
                {...register('degreeOfEducation')}
                labelId="degree-of-education-label"
                label="Degree Of Education"
                error={!!getFormError('degreeOfEducation')}
                defaultValue={selectedTherapist?.degreeOfEducation || ''}
              >
                {Object.entries(EDegtreeOfEducation).map(([key, value]) => (
                  <MenuItem key={key} value={value}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {getFormError('degreeOfEducation')}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth>
              <InputLabel id="working-fields-label">Working Fields</InputLabel>
              <Select
                {...register('workingFields')}
                labelId="working-fields-label"
                label="Working Fields"
                multiple
                error={!!getFormError('workingFields')}
                defaultValue={
                  selectedTherapist?.workingFields
                    ? selectedTherapist?.workingFields?.map((e) => e.id)
                    : []
                }
                disabled={workingFieldsLoading}
                defaultChecked
              >
                {workingFields.map((workingField) => (
                  <MenuItem value={workingField.id}>
                    {workingField.enName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{getFormError('workingFields')}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={12}>
            <TextField
              {...register('address')}
              label="Home Address"
              multiline
              rows={4}
              fullWidth
              error={!!getFormError('address')}
              helperText={getFormError('address')}
            />
          </Grid>
          <Grid item lg={12}>
            <TextField
              {...register('bio')}
              label="Bio"
              multiline
              rows={4}
              fullWidth
              error={!!getFormError('bio')}
              helperText={getFormError('bio')}
            />
          </Grid>
          <Grid item lg={12}>
            <FormControlLabel
              {...register('gender')}
              control={<Checkbox defaultChecked />}
              label="Are You Female?"
            />
          </Grid>
          <Grid item lg={3}>
            <Button type="submit" fullWidth>
              {createOrEditLoading ? (
                <CircularProgress color="inherit" size="30px" />
              ) : (
                <>Save This Therapist</>
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
};

export default CreateOrEditTherapistDialog;
