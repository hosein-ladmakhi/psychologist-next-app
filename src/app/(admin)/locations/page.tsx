import LocationsScreen from "@/screens/Admin/Locations";
import { getLocations } from "@/services/location.service";
import { TLocationsPageFC } from "./page.type";
import { prepareLocationsPageQueryParam } from "./prepare-query";
import { Metadata } from "next";
import { calculateTotalPageTable } from "@/utils/calculateTotalPageTable";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "آدرس ها",
};

const LocationsPage: TLocationsPageFC = async ({ searchParams }) => {
  const currentPage = +(searchParams.page || "1");
  const res = await getLocations(prepareLocationsPageQueryParam(searchParams));
  return <LocationsScreen page={currentPage} count={calculateTotalPageTable(res.count)} data={res.content} />;
};

export default LocationsPage;
