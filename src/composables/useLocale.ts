import { inject } from "vue"
import { localeProviderKey } from '../shared/localeProviderKey'
import { ConfigProviderLocale } from "../components/config-provider/src/configProviderProps"

export function useLocale() {
  return inject<ConfigProviderLocale | undefined>(localeProviderKey, void 0)
}