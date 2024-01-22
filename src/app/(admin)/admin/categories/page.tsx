import CategoriesScreen from "@/screens/Admin/Categories";
import { getCategories } from "@/services/category.service";
import { calculateTotalPageTable } from "@/utils/calculateTotalPageTable";
import { TCategoriesPageFC } from "./page.type";
import { prepareCategoriesPageQueryParam } from "./prepare-query";

const CategoriesPage: TCategoriesPageFC = async ({ searchParams }) => {
  const currentPage = +(searchParams.page || "1");
  const res = await getCategories(prepareCategoriesPageQueryParam(searchParams));

  return <CategoriesScreen data={res?.content} total={calculateTotalPageTable(res?.count)} page={currentPage} />;
};

export default CategoriesPage;
