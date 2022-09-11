import ConfigProvider from './src/ConfigProvider';
import { configProviderProps } from './src/configProviderProps'
import { useConfigProvider } from './src/useConfigProvider'
import { ComponentPlugin } from '../../types/component-plugin';

(ConfigProvider as ComponentPlugin<typeof ConfigProvider>).install = function (Vue) {
  Vue.component(ConfigProvider.name, ConfigProvider);
}

export { ConfigProvider, configProviderProps, useConfigProvider }
