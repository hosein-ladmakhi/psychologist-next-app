import LocationsScreen from "@/screens/Admin/Locations";
import { getLocations } from "@/services/location.service";
import { TLocationsPageFC } from "./page.type";
import { prepareLocationsPageQueryParam } from "./prepare-query";

const LocationsPage: TLocationsPageFC = async ({ searchParams }) => {
  const currentPage = +(searchParams.page || "1");
  const res = await getLocations(prepareLocationsPageQueryParam(searchParams));
  return <LocationsScreen page={currentPage} count={Math.ceil(res.count / 10)} data={res.content} />;
};

export default LocationsPage;
