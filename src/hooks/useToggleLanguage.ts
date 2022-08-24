import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";

type LocaleOption = "es" | "en";

const useToggleLanguage = () => {
  const { push, locale, route } = useRouter();

  const [currentLocale, setCurrentLocale] = useLocalStorage<LocaleOption>({
    key: "color-scheme",
    defaultValue: locale as LocaleOption,
  });

  const toggleLanguage = () => {
    const newLocale = currentLocale === "es" ? "en" : "es";
    setCurrentLocale(newLocale);
    push(route, route, { locale: newLocale });
  };

  useHotkeys([["mod+shift+K", () => toggleLanguage()]]);

  return { currentLocale, toggleLanguage };
};

export default useToggleLanguage;
