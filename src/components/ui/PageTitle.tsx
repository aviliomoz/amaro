type Props = {
    children: React.ReactNode
}

export const PageTitle = ({ children }: Props) => {
    return <h2 className="text-lg font-semibold">{children}</h2>
}