import { Plus } from "lucide-react";
import { LinkButton } from "../components/ui/LinkButton";
import { PageHeader } from "../components/ui/PageHeader";
import { StatusFilter } from "../components/filters/StatusFilter";

export const AreasPage = () => {
  return (
    <>
      <PageHeader title="Áreas de producción">
        <StatusFilter />
        <LinkButton icon={Plus} url={`/restaurant/settings/areas/new`}>
          Nueva área
        </LinkButton>
      </PageHeader>
    </>
  );
};
