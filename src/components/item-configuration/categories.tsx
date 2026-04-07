import { RadioCard, SimpleGrid } from "@chakra-ui/react";

export default function Categories({ category, setCategory }: { category: string | null; setCategory: (value: string) => void }) {
  const categories = [
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
    { value: "lunch", label: "Lunch", description: "Sandwiches and pockets" },
    {
      value: "RTD",
      label: "RTD",
      description: "Ready-to-eat snacks, boxes, and drinks",
    },
    { value: "coffee", label: "Coffee", description: "Bagged coffee" },
  ];

  return (
    <RadioCard.Root
      value={category}
      onValueChange={(e) => e.value && setCategory(e.value)}
    >
      <RadioCard.Label>Select item category</RadioCard.Label>
      <SimpleGrid columns={2} gap="3">
        {categories.map((category) => (
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
