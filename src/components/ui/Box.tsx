type Props = {
    children: React.ReactNode,
    title: string
}

export const Box = ({children, title}: Props) => {
    return <div className="flex flex-col gap-4 border rounded-md shadow-sm p-6 h-fit">
        <h3 className="text-sm font-semibold">{title}</h3>
        {children}
    </div>
}