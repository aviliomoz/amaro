export const Table = ({ children }: { children: React.ReactNode }) => {
    return <div className="border rounded-md w-full h-fit overflow-hidden">
        <table className="text-sm w-full text-center">
            {children}
        </table>
    </div>
}

Table.Header = ({ children }: { children: React.ReactNode }) => {
    return <thead className="text-center">
        {children}
    </thead>
}

Table.Body = ({ children }: { children: React.ReactNode }) => {
    return <tbody className="text-center">
        {children}
    </tbody>
}

Table.Row = ({ children, type = "default" }: { children: React.ReactNode, type?: "default" | "header" }) => {
    return <tr className={`h-8 border-b ${type === "header" ? "bg-stone-100" : "last:border-none"}`}>
        {children}
    </tr>
}

Table.Title = ({ children }: { children: string }) => {
    return <th className="first:pl-6 text-start">
        {children}
    </th>
}

Table.Cell = ({ children }: { children: any }) => {
    return <td className="first:pl-6 text-start">
        {children}
    </td>
}

