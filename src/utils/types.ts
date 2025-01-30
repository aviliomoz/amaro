import { COMBO_SUBTYPES, ITEM_STATUSES, ITEM_TYPES, PRODUCT_SUBTYPES, BASE_RECIPE_SUBTYPES, SUPPLY_SUBTYPES } from "./constants";

export type User = {
  id: string,
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

export type ItemType = typeof ITEM_TYPES[number]
export type ItemStatus = typeof ITEM_STATUSES[number]

export type SupplySubtype = typeof SUPPLY_SUBTYPES[number]
export type SubproductSubtype = typeof BASE_RECIPE_SUBTYPES[number]
export type ProductSubtype = typeof PRODUCT_SUBTYPES[number]
export type ComboSubtype = typeof COMBO_SUBTYPES[number]

export type Category = {
  id: string,
  name: string,
  status: string,
}

export type Currency = {
  symbol: string;
  name: string;
  code: string;
}

export type Restaurant = {
  id: string;
  name: string;
  currency_code: string;
  purchase_tax: number;
  sales_tax: number;
  status: "active" | "inactive";
}