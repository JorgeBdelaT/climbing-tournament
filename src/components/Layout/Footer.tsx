import { Anchor, Center, Text } from "@mantine/core";

const Footer = () => {
  return (
    <Center inline sx={{ height: "100%" }} px="xl">
      <Text size="xs">
        Made with ❤️ by{" "}
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
