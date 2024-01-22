import LocationsScreen from "@/screens/Admin/Locations";
import { getLocations } from "@/services/location.service";
import { FC } from "react";

const LocationsPage: FC = async () => {
  const res = await getLocations();
  return <LocationsScreen count={res.count} data={res.content} />;
};

export default LocationsPage;
