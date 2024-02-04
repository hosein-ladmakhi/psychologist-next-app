import ProfileScreen from "@/screens/Therapist/Profile";
import { TProfilePageFC } from "./page.type";
import { getProfile } from "@/services/auth.service";
import { ITherapist } from "@/types/therapist.model";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export const dynamic = "force-dynamic";

const ProfilePage: TProfilePageFC = async () => {
  const user = await getProfile<ITherapist>();
  return <ProfileScreen user={user} />;
};

export default ProfilePage;
