import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import Link from "next/link";

const TournamentCTA = () => {
  return (
    <Link href="/tournaments/new" passHref>
      <Button
        mb="xl"
        sx={{ width: "100%" }}
        variant="light"
        component="a"
        leftIcon={<IconPlus size={18} />}
      >
        Create a tournament
      </Button>
    </Link>
  );
};

export default TournamentCTA;
