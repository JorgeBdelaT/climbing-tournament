import { useRouter } from "next/router";

import en from "../locales/en";
import es from "../locales/es";

const useTranslations = () => {
  const { locale } = useRouter();

  return locale === "es" ? es : en;
};

export default useTranslations;
