import type { DraftUnit } from "./types";

export function getUnit(units: DraftUnit[], name: string) {
  return units.find((unit) => unit.name === name);
}

export function getParentUnit(units: DraftUnit[], childName: string) {
  const child = getUnit(units, childName);

  if (!child) {
    return undefined;
  }

  return units.find((unit) => unit.level === child.level + 1);
}

export function usesInners(units: DraftUnit[]) {
  return getParentUnit(units, "each")?.name === "inner";
}

export function getQtyBetween(
  units: DraftUnit[],
  fromName: string,
  toName: string,
) {
  const orderedUnits = [...units].sort((left, right) => left.level - right.level);
  const fromUnit = orderedUnits.find((unit) => unit.name === fromName);
  const toUnit = orderedUnits.find((unit) => unit.name === toName);

  if (!fromUnit || !toUnit || fromUnit.level >= toUnit.level) {
    return "";
  }

  let total = 1;

  for (let level = fromUnit.level; level < toUnit.level; level += 1) {
    const currentUnit = orderedUnits.find((unit) => unit.level === level);
    const qty = Number(currentUnit?.qtyPerParent ?? "");

    if (!qty) {
      return "";
    }

    total *= qty;
  }

  return String(total);
}

export function upsertUnit(units: DraftUnit[], nextUnit: DraftUnit) {
  const existingIndex = units.findIndex((unit) => unit.name === nextUnit.name);

  if (existingIndex === -1) {
    return [...units, nextUnit].sort((left, right) => left.level - right.level);
  }

  const nextUnits = [...units];
  nextUnits[existingIndex] = nextUnit;
  return nextUnits.sort((left, right) => left.level - right.level);
}