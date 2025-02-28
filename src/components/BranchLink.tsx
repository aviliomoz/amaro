import { Link, LinkProps, useParams } from "react-router-dom"

export const BranchLink = ({ to, children, className, ...props }: LinkProps) => {

    const { branch_id } = useParams()

    return <Link to={`/b/${branch_id}${to}`} className={className} {...props}>{children}</Link>
}