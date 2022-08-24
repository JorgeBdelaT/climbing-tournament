import { Anchor, Center, Text } from "@mantine/core";
import useTranslations from "../../hooks/useTranslations";

const Footer = () => {
  const t = useTranslations();

  return (
    <Center inline sx={{ height: "100%" }} px="xl">
      <Text size="xs">
        {t.madeWith} ❤️ {t.by}{" "}
        <Anchor
          href="https://github.com/JorgeBdelaT"
          target="_blank"
          sx={{
            color: "inherit",
            "&:hover": {
              textDecoration: "none",
            },
          }}
        >
          Jorge
        </Anchor>
      </Text>
    </Center>
  );
};

export default Footer;
