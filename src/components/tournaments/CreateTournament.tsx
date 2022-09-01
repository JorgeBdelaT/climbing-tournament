import {
  Button,
  Code,
  createStyles,
  FileInput,
  Group,
  Modal,
  Stack,
  Stepper,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconCalendarEvent,
  IconDeviceFloppy,
  IconPlus,
  IconTrash,
  IconUpload,
} from "@tabler/icons";
import { useRouter } from "next/router";
import { FC } from "react";

import useCreateTournament from "@/hooks/tournaments/useCreateTournament";
import useToggleLanguage from "@/hooks/useToggleLanguage";
import useTranslations from "@/hooks/useTranslations";

// TODO:
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

const IS_MOBILE_MEDIA_QUERY = "(max-width: 600px)";

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
  column: {
    flexGrow: 1,
    width: "100%",

    [theme.fn.largerThan("md")]: {
      width: "unset",
    },
  },
}));

// TODO: create CreateTournamentModal.tsx file
interface ModalTitleProps {
  reset: () => void;
}

const ModalTitle: FC<ModalTitleProps> = ({ reset }) => {
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
  const { currentLocale } = useToggleLanguage();
  const { form, step, nextStep, prevStep, finalStep } = useCreateTournament();

  const isMobile = useMediaQuery(IS_MOBILE_MEDIA_QUERY);

  console.log(
    form.values.startDate ? new Date(form.values.startDate) : undefined,
    isMobile
  );

  return (
    <Modal
      opened
      centered
      overlayOpacity={0.55}
      overlayBlur={3}
      transition="fade"
      transitionDuration={600}
      transitionTimingFunction="ease"
      onClose={() => router.push("/")}
      title={<ModalTitle reset={form.reset} />}
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
          active={step}
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
            <Group spacing="xl" align="flex-start">
              <Stack spacing="md" className={classes.column}>
                <TextInput
                  withAsterisk
                  label="Name"
                  placeholder="Name"
                  {...form.getInputProps("name")}
                />
                <TextInput
                  withAsterisk
                  label="Location"
                  placeholder="Location"
                  {...form.getInputProps("location")}
                />
                <TextInput
                  withAsterisk
                  label="Organization"
                  placeholder="Organization"
                  {...form.getInputProps("organization")}
                />
              </Stack>

              <Stack spacing="md" className={classes.column}>
                <DatePicker
                  withAsterisk
                  icon={<IconCalendarEvent size={14} />}
                  placeholder="Pick the start day"
                  label="Start Day"
                  minDate={new Date()}
                  locale={currentLocale}
                  defaultValue={form.values.startDate}
                  dropdownType={isMobile ? "modal" : "popover"}
                  {...form.getInputProps("startDate")}
                />
                <DatePicker
                  withAsterisk
                  icon={<IconCalendarEvent size={14} />}
                  placeholder="Pick the end day"
                  label="End Day"
                  minDate={form.values.startDate || new Date()}
                  locale={currentLocale}
                  defaultValue={form.values.endDate}
                  dropdownType={isMobile ? "modal" : "popover"}
                  {...form.getInputProps("endDate")}
                />
                <FileInput
                  accept="image/png,image/jpeg"
                  icon={<IconUpload size={14} />}
                  placeholder="Pick a logo for your tournament"
                  label="Tournament Logo"
                  {...form.getInputProps("logo")}
                />
              </Stack>
            </Group>
          </Stepper.Step>

          <Stepper.Step label={t.createTournamentStep2Label}>
            Step 2
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
        {step !== 0 && (
          <Button variant="light" onClick={prevStep}>
            Back
          </Button>
        )}
        {step !== finalStep && (
          <Button onClick={() => nextStep()}>Next step</Button>
        )}
        {step === finalStep && (
          <Button leftIcon={<IconDeviceFloppy />}>{t.save}</Button>
        )}
      </Group>
    </Modal>
  );
};

export default CreateTournament;
