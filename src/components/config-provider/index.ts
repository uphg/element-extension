import ConfigProvider from './src/ConfigProvider';
import { configProviderProps } from './src/configProviderProps'
import { useConfigProvider } from './src/useConfigProvider'
import { withInstall } from '../../utils'

const EConfigProvider = withInstall(ConfigProvider)

export { ConfigProvider, EConfigProvider, configProviderProps, useConfigProvider }
