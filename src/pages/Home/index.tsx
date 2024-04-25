import React from 'react'
import { Button } from 'antd'
import './index.scss'
const Home = (): React.ReactNode => {
	// console.log(import.meta.url, import.meta.env.VITE_SOME_KEY);
	return (
		<div className="home flex-y-center">
			<p className="title">主页</p>
			<Button>按钮</Button>
		</div>
	)
}

export default Home
