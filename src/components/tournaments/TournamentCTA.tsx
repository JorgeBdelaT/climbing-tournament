import useTranslations from "@/hooks/useTranslations";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import Link from "next/link";

const TournamentCTA = () => {
  const t = useTranslations();

  return (
    <Link href="/tournaments/new" passHref>
      <Button
        mb="xl"
        sx={{ width: "100%" }}
        size="lg"
        component="a"
        leftIcon={<IconPlus size={24} />}
      >
        {t.createATournament}
      </Button>
    </Link>
  );
};

export default TournamentCTA;
