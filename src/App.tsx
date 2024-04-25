import { StyleProvider } from '@ant-design/cssinjs'
import Root from '../src/router'

function App() {
	return (
		<StyleProvider hashPriority="high">
			<Root></Root>
		</StyleProvider>
	)
}

export default App
