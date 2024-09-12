import { Plus } from "lucide-react";
import { LinkButton } from "../components/ui/LinkButton";
import { PageHeader } from "../components/ui/PageHeader";
import { StatusFilter } from "../components/filters/StatusFilter";
import { FilterWidget } from "../components/filters/FilterWidget";

export const AreasPage = () => {
  return (
    <>
      <PageHeader title="Áreas de producción">
        <FilterWidget>
          <StatusFilter />
        </FilterWidget>
        <LinkButton icon={Plus} url={`/restaurant/settings/areas/new`}>
          Nueva área
        </LinkButton>
      </PageHeader>
    </>
  );
};
