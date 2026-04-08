import type { CategoryValue, ItemDetails } from "./types";

export const initialDetailsState: ItemDetails = {
  itemName: "",
  isFrozen: false,
  units: [{ name: "each", level: 0, qtyPerParent: "" }],
};

export type CategoryOption = {
  value: Exclude<CategoryValue, null>;
  label: string;
  description: string;
};

export const categoryOptions: CategoryOption[] = [
  {
    value: "bakery",
    label: "Bakery",
    description: "Loaves, croissants, and pastries",
  },
  {
    value: "breakfast",
    label: "Breakfast",
    description: "Sandwiches, egg bites, and wraps",
  },
  {
    value: "lunch",
    label: "Lunch",
    description: "Sandwiches and pockets",
  },
  {
    value: "RTD",
    label: "RTD",
    description: "Ready-to-eat snacks, boxes, and drinks",
  },
  {
    value: "coffee",
    label: "Coffee",
    description: "Bagged coffee",
  },
];
