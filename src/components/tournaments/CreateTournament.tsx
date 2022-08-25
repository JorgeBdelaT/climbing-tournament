import useTranslations from "@/hooks/useTranslations";
import {
  Button,
  Code,
  createStyles,
  Group,
  Modal,
  Stack,
  Stepper,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { IconDeviceFloppy, IconPlus, IconTrash } from "@tabler/icons";
import { useRouter } from "next/router";
import { FC, useEffect, useRef, useState } from "react";

// TODO:
// - BIG REFACTOR
//    - useCreateTournament
//    - add file with validators
// - ver de usar useLocalStorage
// - paso previo para ver si quiere usar datos previos

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
* -> Add categories (novicio M/H, avanzado,...)
- categories: Category[]

* Step 3:
* -> Add rounds (qualys, semis, final)
- rounds: Round[]

* Step 4:
* -> Add boulders
- bouldersPerCategory: number

* Step 5:
* -> Add participants
- participants: Participant[]

* Step 6:
* -> Add route setters
- setters: User[]

* Step 7:
* -> Config managers
- tournamentManagers: TournamentManager[]

* Step 8:
* -> Manage judges
- mainJudge: User
- **judges:** Judge[]
*/

interface CreateFormInput {
  name?: string;
  startTime?: string;
  endTime?: string;
  logo?: string;
  location?: string;
  organization?: string;
}

const IS_MOBILE_MEDIA_QUERY = "(max-width: 600px)";

const INITIAL_VALUES: CreateFormInput = {
  name: "",
  startTime: undefined,
  endTime: undefined,
  logo: undefined,
  location: "",
  organization: "",
};

const useStyles = createStyles((theme) => ({
  header: {
    marginBottom: 40,
  },
  title: {},
  modal: {
    background: theme.other.modeValue(
      theme,
      theme.white,
      theme.colors.deepBlue[4]
    ),
    padding: theme.spacing.xl,

    [theme.fn.largerThan("md")]: {
      width: "98%",
      padding: theme.spacing.xl,
    },
  },
  description: {
    marginBottom: 32,
    fontSize: theme.fontSizes.sm,

    [theme.fn.largerThan("sm")]: {
      marginBottom: 56,
      fontSize: theme.fontSizes.md,
    },
  },
  steps: {
    marginBottom: theme.spacing.sm,

    [theme.fn.largerThan("sm")]: {
      marginBottom: theme.spacing.xl,
    },
  },
  step: {
    maxWidth: "13ch",
    marginRight: 8,

    '&[data-progress="true"]': {
      transform: "scale(1.1)",
    },
  },
  separator: {
    marginRight: 0,
    marginLeft: 0,
  },
}));

interface ModalTitleProps {
  reset: () => void;
  disabledReset: boolean;
}

const ModalTitle: FC<ModalTitleProps> = ({ reset, disabledReset }) => {
  const t = useTranslations();
  const isMobile = useMediaQuery(IS_MOBILE_MEDIA_QUERY);

  return (
    <Group>
      <ThemeIcon variant="light" size={isMobile ? "md" : "xl"} radius="xl">
        <IconPlus />
      </ThemeIcon>
      <Title order={isMobile ? 3 : 1}>{t.createATournament}</Title>
      <Button
        leftIcon={<IconTrash size={18} />}
        variant="subtle"
        disabled={disabledReset}
        onClick={reset}
      >
        Reset
      </Button>
    </Group>
  );
};

const CreateTournament = () => {
  const router = useRouter();
  const { classes } = useStyles();
  const t = useTranslations();

  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: INITIAL_VALUES,

    validate: (values) => {
      if (active === 0) {
        return {
          name:
            !values.name || (values.name && values.name.trim().length < 6)
              ? "Name must include at least 6 characters"
              : null,
        };
      }

      // if (active === 1) {
      //   return {
      //     name:
      //       values.name.trim().length < 2
      //         ? "Name must include at least 2 characters"
      //         : null,
      //     email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
      //   };
      // }

      return {};
    },
  });

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      const storedValue = window.localStorage.getItem("new-tournament-form");
      if (storedValue) {
        try {
          form.setValues(JSON.parse(storedValue));
        } catch (e) {
          console.log("Failed to parse stored value");
        } finally {
          mounted.current = true;
        }
      }
    }
  }, [form]);

  useEffect(() => {
    window.localStorage.setItem(
      "new-tournament-form",
      JSON.stringify(form.values)
    );
  }, [form.values]);

  const nextStep = (n?: number) =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }

      // TODO: refactor
      const nextStep = n ?? current + 1;
      return current < 8 ? nextStep : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Modal
        opened
        centered
        overlayOpacity={0.55}
        overlayBlur={3}
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        onClose={() => router.push("/")}
        title={
          <ModalTitle disabledReset={!form.isTouched()} reset={form.reset} />
        }
        size="xl"
        classNames={{
          header: classes.header,
          title: classes.title,
          modal: classes.modal,
        }}
      >
        <Text className={classes.description}>
          {t.createTournamentDescription}
        </Text>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            nextStep();
          }}
        >
          <input type="submit" hidden />
          <Stepper
            active={active}
            breakpoint="md"
            size="xs"
            classNames={{
              steps: classes.steps,
              step: classes.step,
              separator: classes.separator,
            }}
            onStepClick={nextStep}
          >
            <Stepper.Step label={t.createTournamentStep1Label}>
              <Stack spacing="md">
                <TextInput
                  label="Name"
                  placeholder="Name"
                  {...form.getInputProps("name")}
                />
                <TextInput
                  label="Location"
                  placeholder="Location"
                  {...form.getInputProps("location")}
                />
                <TextInput
                  label="Organization"
                  placeholder="Organization"
                  {...form.getInputProps("organization")}
                />
              </Stack>
            </Stepper.Step>

            <Stepper.Step label={t.createTournamentStep2Label}>
              Step 2
            </Stepper.Step>

            <Stepper.Step label={t.createTournamentStep3Label}>
              Step 3
            </Stepper.Step>

            <Stepper.Step label={t.createTournamentStep4Label}>
              Step 4
            </Stepper.Step>

            <Stepper.Step label={t.createTournamentStep5Label}>
              Step 5
            </Stepper.Step>

            <Stepper.Step label={t.createTournamentStep6Label}>
              Step 6
            </Stepper.Step>

            <Stepper.Step label={t.createTournamentStep7Label}>
              Step 7
            </Stepper.Step>

            <Stepper.Step label={t.createTournamentStep8Label}>
              Step 8
            </Stepper.Step>

            <Stepper.Completed>
              Completed! Form values:
              <Code block mt="xl">
                {JSON.stringify(form.values, null, 2)}
              </Code>
            </Stepper.Completed>
          </Stepper>
        </form>

        <Group position="right" mt="xl">
          {active !== 0 && (
            <Button variant="light" onClick={prevStep}>
              Back
            </Button>
          )}
          {active !== 8 && (
            <Button onClick={() => nextStep()}>Next step</Button>
          )}
          {active === 8 && (
            <Button leftIcon={<IconDeviceFloppy />}>{t.save}</Button>
          )}
        </Group>
      </Modal>
    </>
  );
};

export default CreateTournament;
