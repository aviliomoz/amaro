import { Link, LinkProps, useParams } from "react-router-dom"

export const BranchLink = ({ to, children, className, ...props }: LinkProps) => {

    const { brand_id, branch_id } = useParams()

    return <Link to={`/brands/${brand_id}/branches/${branch_id}${to}`} className={className} {...props}>{children}</Link>
}