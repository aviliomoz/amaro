export const ItemsAreasTable = () => {
    return <div className="border rounded-md w-full h-fit overflow-hidden">
        <table className="text-sm w-full text-center">
            <thead className="text-center">
                <tr className="bg-stone-100 h-9 border-b">
                    <th className="w-5/12 pl-6 text-start">Área</th>
                    <th className="text-start">Concepto</th>
                    <th className="pr-4 text-center">Estado</th>
                </tr>
            </thead>
            <tbody>
                <tr className="h-10 border-b last:border-none">
                    <td className="pl-6 text-start">Almacén</td>
                    <td className="text-start">Almacenamiento</td>
                    <td className="pr-4 gap-2 items-center"><input type="checkbox" /></td>
                </tr>

                {/* Cuando es insumo todos los conceptos son almacenamiento */}
                {/* Cuando es producto transformado todos los conceptos son venta */}
                {/* Cuando es producto no transformado = almacenamiento y venta */}
                {/* Cuando es combo no se muestra */}
                {/* Cuando es receta base almacenamiento y produccion */}

                <tr className="h-10 border-b last:border-none">
                    <td className="pl-6 text-start">Cocina</td>
                    <td className="text-start">Producción</td>
                    <td className="pr-4 gap-2 items-center"><input type="checkbox" /></td>
                </tr>
                <tr className="h-10 border-b last:border-none">
                    <td className="pl-6 text-start">Bar</td>
                    <td className="text-start">Producción</td>
                    <td className="pr-4 gap-2 items-center"><input type="checkbox" /></td>
                </tr>
            </tbody>
        </table>
    </div>
}