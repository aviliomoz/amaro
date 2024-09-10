import { Plus } from "lucide-react";
import { SearchBar } from "../components/filters/SearchBar";
import { StatusFilter } from "../components/filters/StatusFilter";
import { LinkButton } from "../components/ui/LinkButton";
import { PageHeader } from "../components/ui/PageHeader";

export const ProductsPage = () => {
  return (
    <>
      <PageHeader title="Productos">
        <SearchBar />
        <StatusFilter />
        <LinkButton icon={Plus} url={`/restaurant/items/products/new`}>
          Nuevo producto
        </LinkButton>
      </PageHeader>
    </>
  );
};
