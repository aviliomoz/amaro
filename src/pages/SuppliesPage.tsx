import { Plus } from "lucide-react";
import { SearchBar } from "../components/filters/SearchBar";
import { StatusFilter } from "../components/filters/StatusFilter";
import { LinkButton } from "../components/ui/LinkButton";
import { PageHeader } from "../components/ui/PageHeader";

export const SuppliesPage = () => {
  return (
    <>
      <PageHeader title="Insumos">
        <SearchBar />
        <StatusFilter />
        <LinkButton icon={Plus} url={`/restaurant/items/supplies/new`}>
          Nuevo insumo
        </LinkButton>
      </PageHeader>
    </>
  );
};
