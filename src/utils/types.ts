import { COMBO_SUBTYPES, ITEM_STATUSES, ITEM_TYPES, PRODUCT_SUBTYPES, BASE_RECIPE_SUBTYPES, SUPPLY_SUBTYPES } from "./constants";
import { UMS } from "./um";

export type UM = keyof typeof UMS

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
export type ItemSubtype = ProductSubtype | ComboSubtype | SupplySubtype | BaseRecipeSubtype
export type ItemStatus = typeof ITEM_STATUSES[number]

export type SupplySubtype = typeof SUPPLY_SUBTYPES[number]
export type BaseRecipeSubtype = typeof BASE_RECIPE_SUBTYPES[number]
export type ProductSubtype = typeof PRODUCT_SUBTYPES[number]
export type ComboSubtype = typeof COMBO_SUBTYPES[number]

export type Category = {
  id: string,
  name: string,
  status: "active" | "inactive",
}

export type Brand = {
  id: string;
  name: string;
  status: "active" | "inactive";
}

export type Branch = {
  id: string;
  name: string;
  status: "active" | "inactive";
  brand_id: string;
  type: "sales" | "production";
}

export type Item = {
  id: string,
  code?: string,
  name: string,
  category_id: string,
  type: ItemType,
  subtype: ItemSubtype,
  status: string,
  um: UM,
  taxable: boolean,
  yield: number,
  waste: number,
  brand_id: string,
  discharge_type: "recipe" | "unit",
  stock_control: boolean,
  weight_control: false
  price: number,
  cost: number,
}