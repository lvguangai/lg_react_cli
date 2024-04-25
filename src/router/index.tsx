import React, { Suspense, useState } from 'react'
import FcSpin from '../component/FcSpin'
import { ParamsRoute } from './index.d'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { homeLayoutRoutes } from './routerMap'
const RootList = (): React.ReactNode => {
	const [filterRoute] = useState<ParamsRoute[]>(homeLayoutRoutes() || [])

	const getRouteNodes = (routes: ParamsRoute[]) => {
		return routes.map((item) => {
			if (!item.children) {
				return <Route key={item.name} path={item.path} element={<item.element />} />
			} else {
				return (
					<Route key={item.name} path={item.path} element={<item.element />}>
						{getRouteNodes(item.children)}
					</Route>
				)
			}
		})
	}
	return (
		<Router>
			<Suspense
				fallback={
					<div className="page-loading" style={{ textAlign: 'center', marginTop: '30vh' }}>
						<FcSpin size="large" />
					</div>
				}>
				<Routes>{getRouteNodes(filterRoute)}</Routes>
			</Suspense>
		</Router>
	)
}

const Root = React.memo(RootList)
export default Root
