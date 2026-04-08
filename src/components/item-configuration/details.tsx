import {
  CheckboxCard,
  Field,
  Fieldset,
  Input,
  InputGroup,
  NumberInput,
} from "@chakra-ui/react";
import type {
  DetailsFormValues,
  HandleDetailsInputChange,
} from "./types";

export default function Details({
  details,
  eachesPerCase,
  handleDetailsInputChange,
}: {
  details: DetailsFormValues;
  eachesPerCase: string;
  handleDetailsInputChange: HandleDetailsInputChange;
}) {
  return (
    <Fieldset.Root spaceY={20}>
      <Fieldset.Content>
        <Field.Root userSelect="text">
          <Field.Label>Item Name</Field.Label>
          <Input
            placeholder="Enter item name"
            value={details.itemName}
            onChange={(e) =>
              handleDetailsInputChange("itemName", e.target.value)
            }
          />
        </Field.Root>
        <Field.Root>
          <CheckboxCard.Root
            variant="surface"
            colorPalette="blue"
            onCheckedChange={(details) =>
              handleDetailsInputChange("isFrozen", details.checked)
            }
          >
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Control>
              <CheckboxCard.Label>
                Is this item delivered frozen?
              </CheckboxCard.Label>
              <CheckboxCard.Indicator />
            </CheckboxCard.Control>
          </CheckboxCard.Root>
        </Field.Root>
      </Fieldset.Content>
      <Fieldset.Content>
        <Fieldset.HelperText>Units of Measurement (UOM)</Fieldset.HelperText>
        <Field.Root>
          <CheckboxCard.Root
            variant="surface"
            colorPalette="purple"
            onCheckedChange={(details) =>
              handleDetailsInputChange("hasInners", details.checked)
            }
          >
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Control>
              <CheckboxCard.Label>
                Does this item ship with inner packs?
              </CheckboxCard.Label>
              <CheckboxCard.Indicator />
            </CheckboxCard.Control>
          </CheckboxCard.Root>
        </Field.Root>
         <Field.Root>
          <InputGroup hidden={!details.hasInners} endAddon="eaches per inner">
            <NumberInput.Root
              size="lg"
              value={details.eachesPerInner}
              onValueChange={(e) =>
                handleDetailsInputChange("eachesPerInner", e.value)
              }
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
          </InputGroup>
        </Field.Root>
        <Field.Root>
          <InputGroup hidden={!details.hasInners} endAddon="inners per case">
            <NumberInput.Root
              size="lg"
              value={details.innersPerCase}
              onValueChange={(e) =>
                handleDetailsInputChange("innersPerCase", e.value)
              }
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
          </InputGroup>
        </Field.Root>
        <Field.Root>
          <InputGroup endAddon="eaches per case">
            <NumberInput.Root
              size="lg"
              value={eachesPerCase}
              readOnly={details.hasInners}
              onValueChange={(e) =>
                handleDetailsInputChange("eachesPerCase", e.value)
              }
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
          </InputGroup>
        </Field.Root>
      </Fieldset.Content>
    </Fieldset.Root>
  );
}

// make the total case number input a controlled number input
// if the user wants to enter it manually, they can, but if they enter the number
// of eaches per inner and inners per case, we can calculate the quantity per case
