import ConfigProvider from './src/ConfigProvider';
import { configProviderProps } from './src/configProviderProps'
import { useConfigProvider } from './src/useConfigProvider'

ConfigProvider.install = function (Vue) {
  Vue.component(ConfigProvider.name, ConfigProvider);
}

export { ConfigProvider, configProviderProps, useConfigProvider }
