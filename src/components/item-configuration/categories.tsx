import { RadioCard, SimpleGrid } from "@chakra-ui/react";
import { categoryOptions } from "./constants";
import type { CategoryValue } from "./types";

export default function Categories({
  category,
  setCategory,
}: {
  category: CategoryValue;
  setCategory: (value: string) => void;
}) {
  return (
    <RadioCard.Root
      value={category}
      onValueChange={(e) => e.value && setCategory(e.value)}
    >
      <RadioCard.Label>Select item category</RadioCard.Label>
      <SimpleGrid columns={2} gap="3">
        {categoryOptions.map((category) => (
          <RadioCard.Item key={category.value} value={category.value}>
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemContent>
                <RadioCard.ItemText>{category.label}</RadioCard.ItemText>
                <RadioCard.ItemDescription>
                  {category.description}
                </RadioCard.ItemDescription>
              </RadioCard.ItemContent>
              <RadioCard.ItemIndicator />
            </RadioCard.ItemControl>
          </RadioCard.Item>
        ))}
      </SimpleGrid>
    </RadioCard.Root>
  );
}
