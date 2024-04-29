import React, { createContext, useContext, useState, FC } from 'react'
import { ConfigProvider, theme } from 'antd'

interface PropsParams {
	setThemeStatus: (s: boolean) => void
}

const ThemeContext = createContext({} as PropsParams)
const ThemeModeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [themeStatus, setThemeStatus] = useState<boolean>(true) // theme: false 暗黑模式
	return (
		<ThemeContext.Provider value={{ setThemeStatus }}>
			<ConfigProvider
				theme={{
					algorithm: themeStatus === false ? theme.defaultAlgorithm : theme.darkAlgorithm
				}}>
				<div className={themeStatus ? 'light' : 'dark'}>{children}</div>
			</ConfigProvider>
		</ThemeContext.Provider>
	)
}
const useProfile = (): PropsParams => useContext(ThemeContext)
// eslint-disable-next-line react-refresh/only-export-components
export { ThemeModeProvider, useProfile }
export default ThemeModeProvider
