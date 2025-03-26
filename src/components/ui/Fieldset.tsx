type Props = {
    children: React.ReactNode
}

export const Fieldset = ({ children }: Props) => {
    return <fieldset className="flex flex-col gap-2">
        {children}
    </fieldset>
}