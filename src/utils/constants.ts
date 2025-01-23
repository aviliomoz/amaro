export const ITEM_TYPES = ["supply", "subproduct", "product", "combo"] as const

export const ITEM_STATUSES = ["active", "inactive"] as const

export const SUPPLY_SUBTYPES = ["ingredient", "disposable", "other"] as const
export const SUBPRODUCT_SUBTYPES = ["derivative", "base-recipe", "portion"] as const
export const PRODUCT_SUBTYPES = ["unprocessed", "transformed"] as const
export const COMBO_SUBTYPES = ["promotion", "menu"] as const