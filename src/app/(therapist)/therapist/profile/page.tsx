import ProfileScreen from "@/screens/Therapist/Profile";
import { TProfilePageFC } from "./page.type";
import { getProfile } from "@/services/auth.service";
import { ITherapist } from "@/types/therapist.model";

const ProfilePage: TProfilePageFC = async () => {
  const user = await getProfile<ITherapist>();
  return <ProfileScreen user={user} />;
};

export default ProfilePage;
