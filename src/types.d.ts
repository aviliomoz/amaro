export type ItemType = "supply" | "subproduct" | "product" | "combo";
export type ItemStatus = "active" | "inactive";

export type Category = {
  _id: string;
  name: string;
  status: ItemStatus;
};
