import { ItemSubtypeEnum, ItemTypeEnum } from "./types";

export const getItemTypeName = (itemType: ItemTypeEnum) => {
    switch (itemType) {
        case "products": return "Producto";
        case "combos": return "Combo";
        case "supplies": return "Insumo";
        case "base-recipes": return "Receta base";
    }
}

export const getItemSubtypeName = (itemSubtype: ItemSubtypeEnum) => {
    switch (itemSubtype) {
        case "unprocessed": return "No transformado";
        case "transformed": return "Transformado";
        case "promotions": return "Promoción";
        case "menus": return "Menú";
        case "buffets": return "Buffet";
        case "ingredients": return "Ingrediente";
        case "consumables": return "Artículo";
        case "preparations": return "Preparación";
        case "derivatives": return "Derivado";
        case "portions": return "Porción";
    }
}

export const getSubtypesByType = (type: ItemTypeEnum): ItemSubtypeEnum[] => {
    switch (type) {
        case "products": return ["unprocessed", "transformed"];
        case "combos": return ["promotions", "menus", "buffets"];
        case "supplies": return ["ingredients", "consumables"];
        case "base-recipes": return ["preparations", "derivatives", "portions"];
    }
}