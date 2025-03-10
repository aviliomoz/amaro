import { ItemSubtype, ItemType } from "./types";

export const getItemTypeName = (itemType: ItemType) => {
    switch (itemType) {
        case "product": return "Producto";
        case "combo": return "Combo";
        case "supply": return "Insumo";
        case "base-recipe": return "Receta base";
    }
}

export const getItemSubtypeName = (itemSubtype: ItemSubtype) => {
    switch (itemSubtype) {
        case "unprocessed": return "No transformado";
        case "transformed": return "Transformado";
        case "promotion": return "Promoción";
        case "menu": return "Menú";
        case "buffet": return "Buffet";
        case "ingredient": return "Ingrediente";
        case "derivative": return "Derivado";
        case "portion": return "Porción";
        case "disposable": return "Descartable";
        case "other": return "Artículo";
        case "pre-made": return "Pre elaborada";
        case "minute": return "A la minuta";
    }
}

export const getSubtypesByType = (type: ItemType) => {
    switch (type) {
        case "product": return ["unprocessed", "transformed"];
        case "combo": return ["promotion", "menu", "buffet"];
        case "supply": return ["ingredient", "disposable", "other"];
        case "base-recipe": return ["pre-made", "minute"];
    }
}