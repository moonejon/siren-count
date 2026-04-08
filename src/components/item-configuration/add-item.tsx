"use client";
import { Box, Button, ButtonGroup, Flex, Steps } from "@chakra-ui/react";
import { useState } from "react";
import Categories from "./categories";
import Details from "./details";
import Location from "./location";
import StateMonitor from "../dev-tools/state-monitor";
import { initialDetailsState } from "./constants";
import {
  getQtyBetween,
  getUnit,
  upsertUnit,
  usesInners,
} from "./helpers";
import type { DetailsFormValues, DraftUnit } from "./types";

export default function AddItem() {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<string | null>(null);

  const [details, setDetails] = useState(initialDetailsState);
  const isNextDisabled = category === null;


  const handleDetailsInputChange = (
    field: string,
    value: string | number | boolean,
  ) => {
    setDetails((prevState) => {
      if (field === "itemName" || field === "isFrozen") {
        return { ...prevState, [field]: value };
      }

      if (field === "hasInners") {
        const eachUnit = getUnit(prevState.units, "each") ?? {
          name: "each",
          level: 0,
          qtyPerParent: "",
        };
        const caseUnit = getUnit(prevState.units, "case") ?? {
          name: "case",
          level: value ? 2 : 1,
          qtyPerParent: "",
        };

        if (value === false) {
          const nextUnits = prevState.units
            .filter((unit) => unit.name !== "inner")
            .map((unit) => {
              if (unit.name === "case") {
                return { ...unit, level: 1 };
              }

              return unit;
            });

          return {
            ...prevState,
            units: upsertUnit(nextUnits, { ...eachUnit, qtyPerParent: "" }),
          };
        }

        let nextUnits: DraftUnit[] = prevState.units.map((unit) => {
          if (unit.name === "case") {
            return { ...unit, level: 2 };
          }

          return unit;
        });

        nextUnits = upsertUnit(nextUnits, { ...caseUnit, level: 2 });
        nextUnits = upsertUnit(nextUnits, {
          name: "inner",
          level: 1,
          qtyPerParent: getUnit(prevState.units, "inner")?.qtyPerParent ?? "",
        });

        return {
          ...prevState,
          units: nextUnits,
        };
      }

      if (field === "eachesPerInner") {
        const eachUnit = getUnit(prevState.units, "each") ?? {
          name: "each",
          level: 0,
          qtyPerParent: "",
        };

        return {
          ...prevState,
          units: upsertUnit(prevState.units, {
            ...eachUnit,
            qtyPerParent: String(value),
          }),
        };
      }

      if (field === "innersPerCase") {
        const nextUnits = upsertUnit(prevState.units, {
          name: "inner",
          level: 1,
          qtyPerParent: String(value),
        });

        return {
          ...prevState,
          units: upsertUnit(nextUnits, {
            name: "case",
            level: 2,
            qtyPerParent: getUnit(nextUnits, "case")?.qtyPerParent ?? "",
          }),
        };
      }

      if (field === "eachesPerCase") {
        const eachUnit = getUnit(prevState.units, "each") ?? {
          name: "each",
          level: 0,
          qtyPerParent: "",
        };
        const nextUnits = upsertUnit(prevState.units, {
          ...eachUnit,
          qtyPerParent: String(value),
        });

        return {
          ...prevState,
          units: upsertUnit(nextUnits, {
            name: "case",
            level: 1,
            qtyPerParent: getUnit(nextUnits, "case")?.qtyPerParent ?? "",
          }),
        };
      }

      return prevState;
    });
  };

  const hasInners = usesInners(details.units);
  const eachesPerCase = getQtyBetween(details.units, "each", "case");
  const detailValues: DetailsFormValues = {
    itemName: details.itemName,
    isFrozen: details.isFrozen,
    hasInners,
    innersPerCase: getUnit(details.units, "inner")?.qtyPerParent ?? "",
    eachesPerInner: hasInners
      ? getUnit(details.units, "each")?.qtyPerParent ?? ""
      : "",
  };

  const steps = [
    {
      title: "Category",
      component: <Categories category={category} setCategory={setCategory} />,
    },
    {
      title: "Details",
      component: (
        <Details
          details={detailValues}
          eachesPerCase={eachesPerCase}
          handleDetailsInputChange={handleDetailsInputChange}
        />
      ),
    },
    {
      title: "Location",
      component: <Location />,
    },
  ];

  return (
    <>
      <Box p="6" width="400px">
        <Steps.Root
          step={step}
          onStepChange={(e) => setStep(e.step)}
          count={steps.length}
          size="xs"
          colorScheme="green"
          spaceY="10"
        >
          <Steps.List>
            {steps.map((s, index) => (
              <Steps.Item key={index} index={index}>
                <Steps.Indicator />
                <Steps.Title>{s.title}</Steps.Title>
                <Steps.Separator />
              </Steps.Item>
            ))}
          </Steps.List>
          {steps.map((s, index) => (
            <Steps.Content key={index} index={index}>
              {s.component}
            </Steps.Content>
          ))}
        </Steps.Root>
        <Flex justify="right" mt="4">
          <ButtonGroup size="md" variant="outline">
            {step > 0 && (
              <Button onClick={() => setStep(step - 1)}>Prev</Button>
            )}
            {step < steps.length - 1 && (
              <Button
                aria-disabled={isNextDisabled}
                cursor={isNextDisabled ? "not-allowed" : "pointer"}
                opacity={isNextDisabled ? 0.5 : 1}
                onClick={() => {
                  if (isNextDisabled) {
                    return;
                  }

                  setStep(step + 1);
                }}
              >
                Next
              </Button>
            )}
          </ButtonGroup>
        </Flex>
      </Box>
      <StateMonitor state={{ step, category, details }} />
    </>
  );
}
