import {
  Button,
  Code,
  createStyles,
  Group,
  Modal,
  PasswordInput,
  Stepper,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons";
import { useRouter } from "next/router";
import { useState } from "react";

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

const useStyles = createStyles((theme) => ({
  header: {
    marginBottom: 56,
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
}));

const ModalTitle = () => (
  <Group>
    <ThemeIcon variant="light" size="xl" radius="xl">
      <IconPlus />
    </ThemeIcon>
    <Title order={1}>Create a tournament</Title>
  </Group>
);

const CreateTournament = () => {
  const router = useRouter();
  const { classes } = useStyles();

  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      name: "",
      email: "",
      website: "",
      github: "",
    },

    validate: (values) => {
      if (active === 0) {
        return {
          username:
            values.username.trim().length < 6
              ? "Username must include at least 6 characters"
              : null,
          password:
            values.password.length < 6
              ? "Password must include at least 6 characters"
              : null,
        };
      }

      if (active === 1) {
        return {
          name:
            values.name.trim().length < 2
              ? "Name must include at least 2 characters"
              : null,
          email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
        };
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

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
      title={<ModalTitle />}
      size="xl"
      classNames={{
        header: classes.header,
        title: classes.title,
        modal: classes.modal,
      }}
    >
      <Stepper active={active} breakpoint="sm">
        <Stepper.Step label="Basic information">
          <TextInput
            label="Username"
            placeholder="Username"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            mt="md"
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
        </Stepper.Step>

        <Stepper.Step label="Add categories">
          <TextInput
            label="Name"
            placeholder="Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            mt="md"
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
        </Stepper.Step>

        <Stepper.Step label="Add rounds">
          <TextInput
            label="Website"
            placeholder="Website"
            {...form.getInputProps("website")}
          />
          <TextInput
            mt="md"
            label="GitHub"
            placeholder="GitHub"
            {...form.getInputProps("github")}
          />
        </Stepper.Step>

        <Stepper.Step label="Add boulders">
          <TextInput
            label="Website"
            placeholder="Website"
            {...form.getInputProps("website")}
          />
          <TextInput
            mt="md"
            label="GitHub"
            placeholder="GitHub"
            {...form.getInputProps("github")}
          />
        </Stepper.Step>

        <Stepper.Step label="Add participants">
          <TextInput
            label="Website"
            placeholder="Website"
            {...form.getInputProps("website")}
          />
          <TextInput
            mt="md"
            label="GitHub"
            placeholder="GitHub"
            {...form.getInputProps("github")}
          />
        </Stepper.Step>

        <Stepper.Step label="Add route setters">
          <TextInput
            label="Website"
            placeholder="Website"
            {...form.getInputProps("website")}
          />
          <TextInput
            mt="md"
            label="GitHub"
            placeholder="GitHub"
            {...form.getInputProps("github")}
          />
        </Stepper.Step>

        <Stepper.Step label="Config managers">
          <TextInput
            label="Website"
            placeholder="Website"
            {...form.getInputProps("website")}
          />
          <TextInput
            mt="md"
            label="GitHub"
            placeholder="GitHub"
            {...form.getInputProps("github")}
          />
        </Stepper.Step>

        <Stepper.Step label="Manage judges">
          <TextInput
            label="Website"
            placeholder="Website"
            {...form.getInputProps("website")}
          />
          <TextInput
            mt="md"
            label="GitHub"
            placeholder="GitHub"
            {...form.getInputProps("github")}
          />
        </Stepper.Step>

        <Stepper.Completed>
          Completed! Form values:
          <Code block mt="xl">
            {JSON.stringify(form.values, null, 2)}
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
    </Modal>
  );
};

export default CreateTournament;
