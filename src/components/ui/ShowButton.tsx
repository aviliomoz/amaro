export const ShowButton = ({ children, onClick }: { children: string, onClick: () => void }) => {

    return <button onClick={onClick} className="border border-dashed rounded-md py-2 px-3 text-sm text-stone-500 hover:bg-stone-50">
        {children}
    </button>
}