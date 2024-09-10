import { Plus } from "lucide-react";
import { SearchBar } from "../components/filters/SearchBar";
import { StatusFilter } from "../components/filters/StatusFilter";
import { LinkButton } from "../components/ui/LinkButton";
import { PageHeader } from "../components/ui/PageHeader";

export const CombosPage = () => {
  return (
    <>
      <PageHeader title="Combos">
        <SearchBar />
        <StatusFilter />
        <LinkButton icon={Plus} url={`/restaurant/items/combos/new`}>
          Nuevo combo
        </LinkButton>
      </PageHeader>
    </>
  );
};
