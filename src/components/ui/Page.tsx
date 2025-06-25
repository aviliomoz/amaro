import { Loading } from "./Loading"

export const Page = ({ children, title }: { children: React.ReactNode, title: string }) => {
    return <>
        <title>{title}</title>
        {children}
    </>

}

Page.Header = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex items-center justify-between mb-4">
        {children}
    </div>
}

Page.Title = ({ children }: { children: React.ReactNode }) => {
    return <h3 className="font-semibold text-lg">{children}</h3>
}

Page.Content = ({ children, loading = false }: { children: React.ReactNode, loading?: boolean }) => {

    if (loading) return <Loading />

    return <>{children}</>
}
