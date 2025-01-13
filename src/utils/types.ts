import { ITEM_STATUSES, ITEM_TYPES } from "./constants";

export type Brand = {
  id: string;
  name: string;
};

export type Branch = {
  id: string;
  name: string;
};

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

export type Category = {
  id: string,
  name: string,
  status: string,
}