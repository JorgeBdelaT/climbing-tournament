import en from "../locales/en";
import es from "../locales/es";
import useToggleLanguage from "./useToggleLanguage";

const useTranslations = () => {
  const { currentLocale } = useToggleLanguage();

  return currentLocale === "es" ? es : en;
};

export default useTranslations;
