import { COMBO_SUBTYPES, ITEM_STATUSES, ITEM_TYPES, PRODUCT_SUBTYPES, BASE_RECIPE_SUBTYPES, SUPPLY_SUBTYPES, UMS, ITEM_DISCHARGE_TYPE } from "./constants";

export type UMEnum = typeof UMS[number]
export type ItemDischargeEnum = typeof ITEM_DISCHARGE_TYPE[number]

export type User = {
  id?: string,
  name: string,
  lastname: string,
  email: string
}

export type APIResponse<T> = {
  ok: boolean,
  error: string | null,
  data: T,
  message: string | undefined
}

export type ItemStatusEnum = typeof ITEM_STATUSES[number]
export type ItemTypeEnum = typeof ITEM_TYPES[number]

export type SupplySubtypeEnum = typeof SUPPLY_SUBTYPES[number]
export type BaseRecipeSubtypeEnum = typeof BASE_RECIPE_SUBTYPES[number]
export type ProductSubtypeEnum = typeof PRODUCT_SUBTYPES[number]
export type ComboSubtypeEnum = typeof COMBO_SUBTYPES[number]

export type ItemSubtypeEnum = ProductSubtypeEnum | ComboSubtypeEnum | SupplySubtypeEnum | BaseRecipeSubtypeEnum

export type Category = {
  id?: string,
  name: string,
  status: ItemStatusEnum,
}

export type Brand = {
  id?: string;
  name: string;
  status: ItemStatusEnum;
  slug: string;
}

export type Branch = {
  id?: string;
  name: string;
  status: ItemStatusEnum;
  brand_id: string;
  slug: string;
}

export type Item = {
  id?: string,
  code?: string,
  name: string,
  category_id: string,
  type: ItemTypeEnum,
  subtype: ItemSubtypeEnum,
  status: string,
  um: UMEnum,
  taxable: boolean,
  yield: number,
  waste: number,
  brand_id: string,
  discharge_type: ItemDischargeEnum,
  weight_control: boolean
}

export type FullItemType = Item & {
  price: number,
  cost: number,
}

export type EquivalenceType = {
  id?: string;
  um: UMEnum;
  item_id: string;
  amount: number;
}