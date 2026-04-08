export interface ItemDetails {
  itemName: string;
  isFrozen: boolean;
  units: DraftUnit[];
}

export interface DetailsFormValues {
  itemName: string;
  isFrozen: boolean;
  hasInners: boolean;
  innersPerCase: string;
  eachesPerInner: string;
}

export type DraftUnit = {
  name: string;
  level: number;
  qtyPerParent: string;
};

export type CategoryValue = string | null;

export type DetailsFieldValue = string | number | boolean;

export type HandleDetailsInputChange = (
  field: string,
  value: DetailsFieldValue,
) => void;
