import { Plus } from "lucide-react";
import { StatusFilter } from "../components/filters/StatusFilter";
import { LinkButton } from "../components/ui/LinkButton";
import { PageHeader } from "../components/ui/PageHeader";
import { FilterWidget } from "../components/filters/FilterWidget";
import { CategoriesList } from "../components/categories/CategoriesList";

export const CategoriesPage = () => {
  return (
    <>
      <PageHeader title="Categorias">
        <FilterWidget>
          <StatusFilter />
        </FilterWidget>
        <LinkButton icon={Plus} url={`/restaurant/settings/categories/new`}>
          Nueva categoria
        </LinkButton>
      </PageHeader>
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <CategoriesList type="supply" />
        <CategoriesList type="base-recipe" />
        <CategoriesList type="product" />
        <CategoriesList type="combo" />
      </section>
    </>
  );
};
