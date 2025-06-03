type Props = {
    status: "active" | "inactive" | "pending" | "deleted"
}

export const StatusTag = ({status}: Props) => {
    const statusMap = {
        active: {
            text: "Activo",
            color: "bg-green-100 text-green-800"
        },
        inactive: {
            text: "Inactivo",
            color: "bg-red-100 text-red-800"
        },
        pending: {
            text: "Pendiente",
            color: "bg-yellow-100 text-yellow-800"
        },
        deleted: {
            text: "Eliminado",
            color: "bg-gray-100 text-gray-800"
        }
    }

    return <span className={`text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded ${statusMap[status].color}`}>
        {statusMap[status].text}
    </span>
}