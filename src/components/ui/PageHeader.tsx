type Props = {
  title: string;
  children?: React.ReactNode;
};

export const PageHeader = ({ title, children = <></> }: Props) => {
  return (
    <div className="flex items-center justify-between mb-6 relative">
      <h2 className="font-semibold text-lg">{title}</h2>
      <div className="flex items-center gap-2 sm:gap-4">{children}</div>
    </div>
  );
};
