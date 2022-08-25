import { VueConstructor } from 'vue';
import ConfigProvider from './src/configProvider';
import { configProviderProps } from './src/configProviderProps'
import { useConfigProvider } from './src/useConfigProvider'

// @ts-ignore
ConfigProvider.install = function (Vue: VueConstructor) {
  Vue.component(ConfigProvider.name, ConfigProvider);
}

export { ConfigProvider, configProviderProps, useConfigProvider }
