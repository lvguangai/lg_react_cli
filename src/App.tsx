import { StyleProvider } from '@ant-design/cssinjs'
import Root from '../src/router'
import ThemeModeProvider from './context/ThemeModeProvider'
import UserInfoProvider from './context/UserInfoProvider'

function App() {
	return (
		<StyleProvider hashPriority="high">
			<UserInfoProvider>
				<ThemeModeProvider>
					<Root></Root>
				</ThemeModeProvider>
			</UserInfoProvider>
		</StyleProvider>
	)
}

export default App
