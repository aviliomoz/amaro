import { ItemSubtypeEnum, ItemTypeEnum } from "./types";

export const getItemTypeName = (itemType: ItemTypeEnum) => {
    switch (itemType) {
        case "products": return "Producto";
        case "combos": return "Combo";
        case "supplies": return "Insumo";
        case "base-recipes": return "Receta base";
    }
}

export const getItemTypeTag = (itemType: ItemTypeEnum) => {
    switch (itemType) {
        case "products": return "PR";
        case "combos": return "CO";
        case "supplies": return "IN";
        case "base-recipes": return "RB";
    }
}

export const getItemSubtypeName = (itemSubtype: ItemSubtypeEnum) => {
    switch (itemSubtype) {
        case "unprocessed": return "No transformados";
        case "transformed": return "Transformados";
        case "promotions": return "Promociones";
        case "menus": return "Menús";
        case "packs": return "Paquetes";
        case "ingredients": return "Ingredientes";
        case "consumables": return "Artículos";
        case "preparations": return "Preparaciones";
        case "portions": return "Porciones";
    }
}

export const getSubtypesByType = (type: ItemTypeEnum): ItemSubtypeEnum[] => {
    switch (type) {
        case "products": return ["unprocessed", "transformed"];
        case "combos": return ["promotions", "menus", "packs"];
        case "supplies": return ["ingredients", "consumables"];
        case "base-recipes": return ["preparations", "portions"];
    }
}