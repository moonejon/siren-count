"use client";
import {
  HStack,
  RadioCard,
  SimpleGrid,
  Steps,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export default function AddItem() {
  const [category, setCategory] = useState<string | null>(null);

  const steps = [
    {
      title: "Category",
      component: <Text color="white.500">Category</Text>,
    },
    {
      title: "Details",
    },
    {
      title: "Location",
    },
  ];

  const categories = [
    { value: "bakery", label: "Bakery", description: "Loaves, croissants, and pastries" },
    { value: "breakfast", label: "Breakfast", description: "Sandwiches, egg bites, and wraps" },
    { value: "lunch", label: "Lunch", description: "Sandwiches and pockets" },
    { value: "RTD", label: "RTD", description: "Ready-to-eat snacks, boxes, and drinks" },
    { value: "coffee", label: "Coffee", description: "Bagged coffee" },
  ];

  return (
    <Steps.Root defaultStep={0} size="xs" colorScheme="green" spaceY="10">
      <Steps.List>
        {steps.map((step, index) => (
          <Steps.Item key={index} index={index} title={step.title}>
            <Steps.Indicator />
            <Steps.Title>{step.title}</Steps.Title>
            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>
      {steps.map((step, index) => (
        <Steps.Content key={index} index={index}>
          <RadioCard.Root
            value={category}
            onValueChange={(e) => setCategory(e.value)}
          >
            <RadioCard.Label>Select item category</RadioCard.Label>
            <SimpleGrid columns={2} gap="3">
              {categories.map((category) => (
                <RadioCard.Item key={category.value} value={category.value}>
                  <RadioCard.ItemHiddenInput />
                  <RadioCard.ItemControl>
                    <RadioCard.ItemContent>
                    <RadioCard.ItemText>{category.label}</RadioCard.ItemText>
                    <RadioCard.ItemDescription>{category.description}</RadioCard.ItemDescription>
                    </RadioCard.ItemContent>
                    <RadioCard.ItemIndicator />
                  </RadioCard.ItemControl>
                </RadioCard.Item>
              ))}
            </SimpleGrid>
          </RadioCard.Root>
        </Steps.Content>
      ))}
    </Steps.Root>
  );
}
