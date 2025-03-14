type Props = {
    title: string
    children: React.ReactNode
}

export const NavGroup = ({ title, children }: Props) => {
    return <ul className="flex flex-col gap-4">
        <li>
            <h3 className="text-[11px] font-medium tracking-widest text-stone-500 mb-2 pl-2 mt-1">
                {title}
            </h3>
            <ul className="flex flex-col gap-0.5">
                {children}
            </ul>
        </li>
    </ul>
}