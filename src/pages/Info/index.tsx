import { useState } from 'react'
import { Button } from 'antd'
import './index.scss'

const Info = () => {
	const [count, setCount] = useState(0)
	console.log('fdsfsdd')
	return (
		<div className="info">
			<p className="title">详情1</p>
			{count}
			<Button onClick={() => setCount(count + 1)}>添加</Button>
		</div>
	)
}

export default Info
