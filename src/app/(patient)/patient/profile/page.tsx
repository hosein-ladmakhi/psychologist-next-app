import ProfileScreen from "@/screens/Patient/Profile";
import { TProfilePageFC } from "./page.type";
import { Metadata } from "next";
import { getProfile } from "@/services/auth.service";
import { IPatient } from "@/types/patient.model";

export const metadata: Metadata = {
  title: "My Profile",
};

export const dynamic = "force-dynamic";

const ProfilePage: TProfilePageFC = async () => {
  const user = await getProfile<IPatient>();
  return <ProfileScreen user={user} />;
};

export default ProfilePage;
