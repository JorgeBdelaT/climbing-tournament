import { useForm } from "@mantine/form";
import { useEffect, useRef, useState } from "react";
import { CreateFormInput, CreateTournamentStep } from "@/types/tournament";
import { createTournamentValidators } from "@/validators/createTournamentValidators";

const INITIAL_VALUES: CreateFormInput = {
  name: "",
  startDate: undefined,
  endDate: undefined,
  logo: undefined,
  location: "",
  organization: "",
  categoriesInput: [
    {
      gender: undefined,
      name: undefined,
      roundsCount: undefined,
      bouldersCount: undefined,
    },
  ],
};

const LOCALSTORAGE_KEY = "create-tournament-form";

const FINAL_STEP = 2;
/**
* Step 1:
* -> Basic information
- name: string
- startTime: datetime
- endTime datetime
- logoUrl?: string
- location?: string
- organization: string

* Step 2:
* -> Add category
  - name: CategoryName;
  - gender: Gender;
  - roundsCount: 1 | 2 | 3;
  - bouldersCount: number;

*/

const useCreateTournament = () => {
  const [step, setStep] = useState<CreateTournamentStep>(0);
  const mounted = useRef(false);

  const form = useForm({
    initialValues: INITIAL_VALUES,
    validate: (values) => createTournamentValidators(step, values),
  });

  useEffect(() => {
    if (!mounted.current) {
      const storedValue = window.localStorage.getItem(LOCALSTORAGE_KEY);
      if (storedValue) {
        const values = JSON.parse(storedValue);
        form.setValues({
          ...values,
          startDate: values.startDate ? new Date(values.startDate) : undefined,
          endDate: values.endDate ? new Date(values.endDate) : undefined,
          logo: undefined,
        });
        mounted.current = true;
      }
    }
  }, [form]);

  useEffect(() => {
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(form.values));
  }, [form.values]);

  const nextStep = (n?: number) =>
    setStep((current) => {
      if (form.validate().hasErrors) {
        return current;
      }

      const nextStep = n ?? current + 1;
      return (
        current < FINAL_STEP ? nextStep : current
      ) as CreateTournamentStep;
    });

  const prevStep = () =>
    setStep(
      (current) => (current > 0 ? current - 1 : current) as CreateTournamentStep
    );

  return { form, step, nextStep, prevStep, finalStep: FINAL_STEP };
};

export default useCreateTournament;
