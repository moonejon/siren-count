"use client";
import { Box, Button, ButtonGroup, Flex, Steps } from "@chakra-ui/react";
import { useState } from "react";
import Categories from "./categories";
import Details from "./details";
import Location from "./location";
import StateMonitor from "../dev-tools/state-monitor";

export default function AddItem() {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<string | null>(null);

  const initialDetailsState = {
    itemName: "",
    isFrozen: false,
    hasInners: false,
    innersPerCase: "",
    eachesPerInner: "",
    eachesPerCase: "",
  };

  const [details, setDetails] = useState(initialDetailsState);

  const handleDetailsInputChange = (
    field: string,
    value: string | number | boolean,
  ) => {
    if (field === "hasInners" && value === false) {
      setDetails((prevState) => ({
        ...prevState,
        hasInners: false,
        innersPerCase: "",
        eachesPerInner: "",
        eachesPerCase: "",
      }));
      return;
    }
    setDetails((prevState) => {
      const next = { ...prevState, [field]: value };
      if (next.hasInners) {
        const computed =
          (parseInt(next.innersPerCase) || 0) *
          (parseInt(next.eachesPerInner) || 0);
        next.eachesPerCase = computed.toString();
      }
      return next;
    });
  };

  const eachesPerCase = details.eachesPerCase;

  const steps = [
    {
      title: "Category",
      component: <Categories category={category} setCategory={setCategory} />,
    },
    {
      title: "Details",
      component: (
        <Details
          details={details}
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
          defaultStep={0}
          size="xs"
          colorScheme="green"
          spaceY="10"
        >
          <Steps.List>
            {steps.map((step, index) => (
              <Steps.Item key={index} index={index} title={step.title}>
                <Steps.Indicator />
                <Steps.Title>{step.title}</Steps.Title>
              </Steps.Item>
            ))}
          </Steps.List>
          {steps.map((step, index) => (
            <Steps.Content key={index} index={index}>
              {step.component}
            </Steps.Content>
          ))}
          <Flex justify="right" mt="4">
            <ButtonGroup size="md" variant="outline">
              {step > 0 && (
                <Button onClick={() => setStep(step - 1)}>Prev</Button>
              )}
              <Button
                disabled={!category}
                onClick={() => setStep(step + 1)}
              >
                Next
              </Button>
            </ButtonGroup>
          </Flex>
        </Steps.Root>
      </Box>
      <StateMonitor state={{ step, category, details }} />
    </>
  );
}
