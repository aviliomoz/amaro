type Props = {
  children?: React.ReactNode;
};

export const PageHeader = ({ children }: Props) => {
  return (
    <div className="flex items-center justify-between mb-5">
      {children}
    </div>
  );
};
