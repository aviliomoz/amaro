import { LoaderCircle, Save } from "lucide-react";
import { useItem } from "../contexts/ItemContext";

export const ItemSaveButton = () => {
    const { saveItem, saving } = useItem();

    return (
        <button onClick={saveItem} className="flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-br from-orange-500 to-orange-600 border-orange-600 rounded-md px-4 py-1.5">
            {saving ? <LoaderCircle className='size-4 animate-spin stroke-white' /> : <Save className="size-4 stroke-white" />}
            {saving ? "Guardando" : "Guardar"}
        </button>
    );
}