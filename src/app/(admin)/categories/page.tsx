import CategoriesScreen from "@/screens/Admin/Categories";
import { getCategories } from "@/services/category.service";
import { calculateTotalPageTable } from "@/utils/calculateTotalPageTable";
import { TCategoriesPageFC } from "./page.type";
import { prepareCategoriesPageQueryParam } from "./prepare-query";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "زمینه های تخصصی",
};

const CategoriesPage: TCategoriesPageFC = async ({ searchParams }) => {
  const currentPage = +(searchParams.page || "1");
  const res = await getCategories(prepareCategoriesPageQueryParam(searchParams));

  return <CategoriesScreen count={res.count} data={res?.content} totalPage={calculateTotalPageTable(res?.count)} page={currentPage} />;
};

export default CategoriesPage;
