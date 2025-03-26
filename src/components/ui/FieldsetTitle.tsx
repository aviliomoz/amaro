type Props = {
    htmlFor: string
    children: React.ReactNode
}

export const FieldsetLabel = ({ children, htmlFor }: Props) => {
    return <label className="font-semibold" htmlFor={htmlFor}>{children}</label>
}