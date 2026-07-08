import React, { createContext, useContext, useState, FC, useLayoutEffect, useCallback } from 'react'
import { ConfigProvider, theme } from 'antd'
import './index.scss'
interface PropsParams {
	onSetTheme: (s: string) => void
	themeStatus: boolean
}

const ThemeContext = createContext({} as PropsParams)
const ThemeModeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [themeStatus, setThemeStatus] = useState<boolean>(() => {
		return localStorage.getItem('themeMode') !== 'dark'
	}) // theme: false 暗黑模式

	const onSetTheme = useCallback((val: string) => {
		setThemeStatus(val === 'light')
	}, [])

	useLayoutEffect(() => {
		const themeMode = themeStatus ? 'light' : 'dark'
		document.documentElement.setAttribute('data-theme', themeMode)
		localStorage.setItem('themeMode', themeMode)
	}, [themeStatus])

	return (
		<ThemeContext.Provider value={{ onSetTheme, themeStatus }}>
			<ConfigProvider
				theme={{
					components: {
						Switch: {
							handleBg: themeStatus ? '#ffffff' : '#000'
						},
						Input: {
							activeBg: themeStatus ? '#ffffff' : '#2f2f2f'
						}
					},
					token: {
						colorPrimary: themeStatus ? '#c280ff' : '#fff',
						colorBgElevated: themeStatus ? '#ffffff' : '#2f2f2f',
						colorBgContainer: themeStatus ? '#ffffff' : '#2f2f2f',
						borderRadiusLG: 18
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
