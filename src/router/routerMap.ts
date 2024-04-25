import { lazy, LazyExoticComponent, ReactNode } from 'react'

const Home = lazy(() => import('@/pages/Home'))
const Info = lazy(() => import('@/pages/Info'))
interface ParamsRoute {
	path: string
	name: string
	element: LazyExoticComponent<() => ReactNode>
}

export const homeLayoutRoutes = (): ParamsRoute[] => {
	const loginRoute = [
		{
			path: '/home',
			name: 'Home',
			element: Home
		},
		{
			path: '/info',
			name: 'Info',
			element: Info
		},
		{
			path: '*',
			name: 'SetRoute',
			element: Home
		}
	]
	return loginRoute
}
