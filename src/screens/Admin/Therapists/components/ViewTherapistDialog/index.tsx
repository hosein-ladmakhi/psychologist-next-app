import Modal from "@/components/Modal";
import { PropsWithChildren } from "react";
import { TViewTherapistDialogFC } from "./index.type";
import { Chip, Typography } from "@mui/material";
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
import { getDegreeOfEducationEnum, getGenderEnum } from "@/utils/getEnumTransformer";
import Avatar from "@/components/Avatar";

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
    <Modal handleClose={onClose} opened title="جزئیات پزشک" size="lg">
      <FlexBox width="100%">
        <Avatar src={`${API_URL}${selectedTherapist?.image}`} avatarStyle={{ height: 80, width: 80, marginBottom: "1rem" }} />
      </FlexBox>
      <ContentBox>
        <PersonIcon />
        <ContentText>
          نام و نام خانوادگی پزشک : {selectedTherapist?.firstName} {selectedTherapist?.lastName}
        </ContentText>
      </ContentBox>
      <ContentBox>
        <PhoneIcon />
        <ContentText>
          شماره تماس های پزشک : {selectedTherapist?.phone} - {selectedTherapist?.phone2}
        </ContentText>
      </ContentBox>
      <ContentBox>
        <WcIcon />
        <ContentText>جنسیت پزشک : {getGenderEnum(selectedTherapist?.gender!)}</ContentText>
      </ContentBox>
      <ContentBox>
        <WorkspacePremiumIcon />
        <ContentText>مدرک تحصیلی : {getDegreeOfEducationEnum(selectedTherapist?.degreeOfEducation!)}</ContentText>
      </ContentBox>
      <ContentBox>
        <PlaceIcon />
        <ContentText>آدرس خونه : {selectedTherapist?.address}</ContentText>
      </ContentBox>
      <ContentBox>
        <CategoryIcon />
        <ContentText>زمینه های تخصص پزشک :</ContentText>
        <FlexBox justifyContent="flex-start" gap={0.5} flexWrap="wrap">
          {selectedTherapist?.workingFields?.map((e) => (
            <Chip label={e.faName} key={e.id} size="small" />
          ))}
        </FlexBox>
      </ContentBox>
      <ContentBox>
        <DisplaySettingsIcon />
        <ContentText>بیوگرافی پزشک : {selectedTherapist?.bio}</ContentText>
      </ContentBox>
    </Modal>
  );
};

export default ViewTherapistDialog;
