import { Link } from "react-router-dom"
import { LogoLink } from "../components/LogoLink"
import { Computer, LayoutGrid, Monitor, MonitorCheck } from "lucide-react"


export const PosHomePage = () => {
    return <main className="py-6">
        <div>
            <div className="flex items-center gap-4">
                <LogoLink width="xl" />
                <span className="font-extralight text-2xl text-stone-300">/</span>
                <span className="font-medium">Punto de Venta</span>
                <span className="font-extralight text-2xl text-stone-300">/</span>
                <span className="font-medium">Festa</span>
            </div>
        </div>
        <div className="mt-20 text-center flex items-center flex-col gap-1">
            <h1 className="text-2xl font-bold">Bienvenido al Punto de Venta</h1>
            <p className="mt-2 text-gray-600">Aquí podrás gestionar tus ventas y pedidos de manera eficiente.</p>
            <div className="flex gap-4 mt-10 flex-wrap justify-center">
                <Link to="/pos/registers" className="border rounded-md shadow-md p-6 bg-stone-50 hover:bg-stone-100 transition-all ease-in-out hover:shadow-lg w-72 flex flex-col items-start">
                    <div className="flex items-center gap-3">
                        <Computer className="size-6" />
                        <span className="block mt-2 font-semibold">Cajas</span>
                    </div>
                    <p className="text-stone-600 font-light text-sm text-start mt-3">Gestiona tus cajas, movimientos de efectivo y cuentas por cobrar.</p>
                </Link>
                <Link to="/pos/halls" className="border rounded-md shadow-md p-6 bg-stone-50 hover:bg-stone-100 transition-all ease-in-out hover:shadow-lg w-72 flex flex-col items-start">
                    <div className="flex items-center gap-3">
                        <LayoutGrid className="size-6" />
                        <span className="block mt-2 font-semibold">Salones y mesas</span>
                    </div>
                    <p className="text-stone-600 font-light text-sm text-start mt-3">Gestiona tus cajas, movimientos de efectivo y cuentas por cobrar.</p>
                </Link>
                <Link to="/pos/orders" className="border rounded-md shadow-md p-6 bg-stone-50 hover:bg-stone-100 transition-all ease-in-out hover:shadow-lg w-72 flex flex-col items-start">
                    <div className="flex items-center gap-3">
                        <MonitorCheck className="size-6" />
                        <span className="block mt-2 font-semibold">Monitor de pedidos</span>
                    </div>
                    <p className="text-stone-600 font-light text-sm text-start mt-3">Visualiza los pedidos pendientes de tus áreas de producción.</p>
                </Link>
            </div>
        </div>
    </main>

}