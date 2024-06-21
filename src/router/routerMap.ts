import { lazy, LazyExoticComponent, ReactNode } from 'react'

const Home = lazy(() => import('@/pages/Home'))
const Info = lazy(() => import('@/pages/Info'))
const SignUp = lazy(() => import('@/pages/SignUp'))
const SignIn = lazy(() => import('@/pages/SignIn'))
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'))
interface ParamsRoute {
	path: string
	name: string
	element: LazyExoticComponent<() => ReactNode>
}

export const homeLayoutRoutes = (): ParamsRoute[] => {
	const loginRoute = [
		{
			path: '/platform',
			name: 'Home',
			element: Home
		},
		{
			path: '/info',
			name: 'Info',
			element: Info
		},
		{
			path: '/sign_up',
			name: 'SignUp',
			element: SignUp
		},
		{
			path: '/sign_in',
			name: 'SignIn',
			element: SignIn
		},
		{
			path: '/forgot_password',
			name: 'ForgotPassword',
			element: ForgotPassword
		},
		{
			path: '*',
			name: 'SetRoute',
			element: SignIn
		}
	]
	return loginRoute
}
