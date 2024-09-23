import { useContext } from "react";
import { LocalizationContext } from "@src/libs/context";

export function useI18n() {
  return useContext(LocalizationContext);
}
