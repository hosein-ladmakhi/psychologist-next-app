import Modal from '@/components/Modal';
import { FC } from 'react';
import { VIEW_THERAPIST_SUBJECT } from './index.constant';
import { IViewTherapistDialogProps } from './index.type';
import { Avatar, Box, Chip, Typography } from '@mui/material';
import { API_URL } from '@/constants';
import Image from 'next/image';
import {
  Category,
  DisplaySettings,
  Person,
  Phone,
  Place,
  Wc,
  WorkspacePremium,
} from '@mui/icons-material';

const ViewTherapistDialog: FC<IViewTherapistDialogProps> = ({
  selectedTherapist,
}) => {
  return (
    <Modal subject={VIEW_THERAPIST_SUBJECT} title="View Therapist" size="lg">
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar sx={{ height: 80, width: 80, marginBottom: '1rem' }}>
          <Image
            fill
            alt="profile-img"
            src={`${API_URL}${selectedTherapist?.image}`}
          />
        </Avatar>
      </Box>
      <Box
        my={1}
        gap={1}
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Person />
        <Typography variant="body1" component="h1">
          Full Name : {selectedTherapist?.firstName}{' '}
          {selectedTherapist?.lastName}
        </Typography>
      </Box>
      <Box
        my={1}
        gap={1}
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Phone />
        <Typography variant="body1" component="h1">
          Phone Numbers : {selectedTherapist?.phone} -{' '}
          {selectedTherapist?.phone2}
        </Typography>
      </Box>
      <Box
        my={1}
        gap={1}
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Wc />
        <Typography variant="body1" component="h1">
          Gender : {selectedTherapist?.gender}
        </Typography>
      </Box>
      <Box
        my={1}
        gap={1}
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <WorkspacePremium />
        <Typography variant="body1" component="h1">
          Degree Of Education : {selectedTherapist?.degreeOfEducation}
        </Typography>
      </Box>
      <Box
        my={1}
        gap={1}
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Place />
        <Typography variant="body1" component="h1">
          Location : {selectedTherapist?.address}
        </Typography>
      </Box>
      <Box
        my={1}
        gap={1}
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Category />
        <Typography variant="body1" component="h1">
          Working Fields :
        </Typography>
        <Box
          display="flex"
          justifyCOntent="flex-start"
          alignItems="center"
          gap={0.5}
          flexWrap="wrap"
        >
          {selectedTherapist?.workingFields?.map((e) => (
            <Chip label={e.enName} key={e.id} size="small" />
          ))}
        </Box>
      </Box>
      <Box
        my={1}
        gap={1}
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <DisplaySettings />
        <Typography variant="body1" component="h1">
          Bio : {selectedTherapist?.bio}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ViewTherapistDialog;
