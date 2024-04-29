import { StyleProvider } from '@ant-design/cssinjs'
import Root from '../src/router'
import ThemeModeProvider from './context/ThemeModeProvider'

function App() {
	return (
		<StyleProvider hashPriority="high">
			<ThemeModeProvider>
				<Root></Root>
			</ThemeModeProvider>
		</StyleProvider>
	)
}

export default App
