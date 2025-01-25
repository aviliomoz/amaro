import { Navigate } from "react-router-dom"

type Props = {
    path: string
}

export const RedirectPage = ({ path }: Props) => {
    return <Navigate to={path}></Navigate>
}