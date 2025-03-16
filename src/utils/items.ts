import { ItemSubtype, ItemType } from "./types";

export const getItemTypeName = (itemType: ItemType) => {
    switch (itemType) {
        case "products": return "Producto";
        case "combos": return "Combo";
        case "supplies": return "Insumo";
        case "base-recipes": return "Receta base";
    }
}

export const getItemSubtypeName = (itemSubtype: ItemSubtype) => {
    switch (itemSubtype) {
        case "unprocessed": return "No transformado";
        case "transformed": return "Transformado";
        case "promotions": return "Promoción";
        case "menus": return "Menú";
        case "buffets": return "Buffet";
        case "ingredients": return "Ingrediente";
        case "derivatives": return "Derivado";
        case "consumables": return "Artículo";
        case "pre-made": return "Pre elaborada";
        case "minute": return "A la minuta";
    }
}

export const getSubtypesByType = (type: ItemType): ItemSubtype[] => {
    switch (type) {
        case "products": return ["unprocessed", "transformed"];
        case "combos": return ["promotions", "menus", "buffets"];
        case "supplies": return ["ingredients", "consumables"];
        case "base-recipes": return ["pre-made", "minute"];
    }
}