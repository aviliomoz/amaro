import { Plus } from "lucide-react";
import { SearchBar } from "../components/filters/SearchBar";
import { StatusFilter } from "../components/filters/StatusFilter";
import { LinkButton } from "../components/ui/LinkButton";
import { PageHeader } from "../components/ui/PageHeader";

export const SubproductsPage = () => {
  return (
    <>
      <PageHeader title="Subproductos">
        <SearchBar />
        <StatusFilter />
        <LinkButton icon={Plus} url={`/restaurant/items/subproducts/new`}>
          Nuevo subproducto
        </LinkButton>
      </PageHeader>
    </>
  );
};
