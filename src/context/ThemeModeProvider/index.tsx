import React, { createContext, useContext, useState, FC, useLayoutEffect } from 'react'
import { ConfigProvider, theme } from 'antd'
import './index.scss'
interface PropsParams {
	onSetTheme: (s: string) => void
}

const ThemeContext = createContext({} as PropsParams)
const ThemeModeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [themeStatus, setThemeStatus] = useState<boolean>(true) // theme: false 暗黑模式
	useLayoutEffect(() => {
		// 当然也可以根据本地缓存来修改默认值 如
		if (localStorage.getItem('themeMode') === 'dark') {
			onSetTheme('dark')
		} else {
			onSetTheme('light')
		}
	}, [])
	const onSetTheme = (val: string) => {
		document.documentElement.setAttribute('data-theme', val)
		localStorage.setItem('themeMode', val)
		setThemeStatus(val === 'light' ? true : false)
	}
	return (
		<ThemeContext.Provider value={{ onSetTheme }}>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: '#c280ff'
					},
					algorithm: themeStatus ? theme.defaultAlgorithm : theme.darkAlgorithm
				}}>
				{children}
			</ConfigProvider>
		</ThemeContext.Provider>
	)
}
const useProfile = (): PropsParams => useContext(ThemeContext)
// eslint-disable-next-line react-refresh/only-export-components
export { ThemeModeProvider, useProfile }
export default ThemeModeProvider
