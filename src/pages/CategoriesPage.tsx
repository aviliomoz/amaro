import { Plus } from "lucide-react";
import { StatusFilter } from "../components/filters/StatusFilter";
import { LinkButton } from "../components/ui/LinkButton";
import { PageHeader } from "../components/ui/PageHeader";

export const CategoriesPage = () => {
  return (
    <>
      <PageHeader title="Categorias">
        <StatusFilter />
        <LinkButton icon={Plus} url={`/restaurant/settings/categories/new`}>
          Nueva categoria
        </LinkButton>
      </PageHeader>
    </>
  );
};
