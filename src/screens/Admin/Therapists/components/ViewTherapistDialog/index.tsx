import Modal from "@/components/Modal";
import { FC, PropsWithChildren, ReactNode } from "react";
import { VIEW_THERAPIST_SUBJECT } from "./index.constant";
import { IViewTherapistDialogProps, TViewTherapistDialogFC } from "./index.type";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import { API_URL } from "@/constants";
import Image from "next/image";
import {
  Category as CategoryIcon,
  DisplaySettings as DisplaySettingsIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Place as PlaceIcon,
  Wc as WcIcon,
  WorkspacePremium as WorkspacePremiumIcon,
} from "@mui/icons-material";
import FlexBox from "@/components/FlexBox";

const ContentBox = ({ children }: PropsWithChildren) => (
  <FlexBox my={1} gap={1} justifyContent="flex-start" alignItems="flex-start">
    {children}
  </FlexBox>
);

const ContentText = ({ children }: PropsWithChildren) => {
  return (
    <Typography variant="body1" component="h1">
      {children}
    </Typography>
  );
};

const ViewTherapistDialog: TViewTherapistDialogFC = ({ selectedTherapist, onClose }) => {
  return (
    <Modal handleClose={onClose} subject={VIEW_THERAPIST_SUBJECT} title="View Therapist" size="lg">
      <FlexBox width="100%">
        <Avatar sx={{ height: 80, width: 80, marginBottom: "1rem" }}>
          <Image fill alt="profile-img" src={`${API_URL}${selectedTherapist?.image}`} />
        </Avatar>
      </FlexBox>
      <ContentBox>
        <PersonIcon />
        <ContentText>
          Full Name : {selectedTherapist?.firstName} {selectedTherapist?.lastName}
        </ContentText>
      </ContentBox>
      <ContentBox>
        <PhoneIcon />
        <ContentText>
          Phone Numbers : {selectedTherapist?.phone} - {selectedTherapist?.phone2}
        </ContentText>
      </ContentBox>
      <ContentBox>
        <WcIcon />
        <ContentText>Gender : {selectedTherapist?.gender}</ContentText>
      </ContentBox>
      <ContentBox>
        <WorkspacePremiumIcon />
        <ContentText>Degree Of Education : {selectedTherapist?.degreeOfEducation}</ContentText>
      </ContentBox>
      <ContentBox>
        <PlaceIcon />
        <ContentText>Location : {selectedTherapist?.address}</ContentText>
      </ContentBox>
      <ContentBox>
        <CategoryIcon />
        <ContentText>Working Fields :</ContentText>
        <FlexBox justifyContent="flex-start" gap={0.5} flexWrap="wrap">
          {selectedTherapist?.workingFields?.map((e) => (
            <Chip label={e.enName} key={e.id} size="small" />
          ))}
        </FlexBox>
      </ContentBox>
      <ContentBox>
        <DisplaySettingsIcon />
        <ContentText>Bio : {selectedTherapist?.bio}</ContentText>
      </ContentBox>
    </Modal>
  );
};

export default ViewTherapistDialog;
