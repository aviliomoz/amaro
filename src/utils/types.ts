import { COMBO_SUBTYPES, ITEM_STATUSES, ITEM_TYPES, PRODUCT_SUBTYPES, BASE_RECIPE_SUBTYPES, SUPPLY_SUBTYPES, UMS, ITEM_DISCHARGE_TYPE } from "./constants";

export type APIResponse<T> = {
  ok: boolean,
  error: string | null,
  data: T,
  message: string | undefined
}

export type ItemStatusEnum = typeof ITEM_STATUSES[number]
export type ItemTypeEnum = typeof ITEM_TYPES[number]
export type ItemDischargeEnum = typeof ITEM_DISCHARGE_TYPE[number]
export type UMEnum = typeof UMS[number]

export type SupplySubtypeEnum = typeof SUPPLY_SUBTYPES[number]
export type BaseRecipeSubtypeEnum = typeof BASE_RECIPE_SUBTYPES[number]
export type ProductSubtypeEnum = typeof PRODUCT_SUBTYPES[number]
export type ComboSubtypeEnum = typeof COMBO_SUBTYPES[number]

export type ItemSubtypeEnum = ProductSubtypeEnum | ComboSubtypeEnum | SupplySubtypeEnum | BaseRecipeSubtypeEnum

export type UserType = {
  id?: string,
  name: string,
  lastname: string,
  email: string
}

export type CategoryType = {
  id?: string,
  name: string,
  type: ItemTypeEnum,
  status: ItemStatusEnum,
  restaurant_id: string,
}

export type RestaurantType = {
  id?: string;
  name: string;
  status: ItemStatusEnum;
  slug: string;
  currency_code: string;
  sales_tax: number;
  purchase_tax: number;
  commissions: number
}

export type ItemType = {
  id?: string,
  internal_code: string | null,
  external_code: string | null,
  name: string,
  category_id: string,
  type: ItemTypeEnum,
  subtype: ItemSubtypeEnum,
  um: UMEnum,
  taxable: boolean,
  yield: number,
  waste: number,
  restaurant_id: string,
  discharge_type: ItemDischargeEnum
  sale_price: number;
  purchase_price: number;
  cost_price: number;
  clean_price: number,
  cost_percentage: number,

  has_equivalence: boolean,
  equivalence_um: UMEnum | null,
  equivalence_amount: number | null,

  status: ItemStatusEnum,
}

export type IngredientType = {
  id: string;
  type: ItemTypeEnum;
  name: string;
  amount: number;
  um: UMEnum;
  base_cost: number;
  base_um: UMEnum;
  has_equivalence: boolean;
  equivalence_um: UMEnum | null;
  equivalence_amount: number | null;
}

export type DeviceType = {
  id: string;
  device_code: string;
  restaurant_id: string;
  role: "cashier" | "waiter" | "production";
}