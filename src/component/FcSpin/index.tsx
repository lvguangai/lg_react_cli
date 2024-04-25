import { FC, ReactNode } from 'react'
import { Spin } from 'antd'

import './index.scss'
const CubeGrid: FC = () => {
	return (
		<div className="sk-cube-grid">
			<div className="sk-cube sk-cube1"></div>
			<div className="sk-cube sk-cube2"></div>
			<div className="sk-cube sk-cube3"></div>
			<div className="sk-cube sk-cube4"></div>
			<div className="sk-cube sk-cube5"></div>
			<div className="sk-cube sk-cube6"></div>
			<div className="sk-cube sk-cube7"></div>
			<div className="sk-cube sk-cube8"></div>
			<div className="sk-cube sk-cube9"></div>
		</div>
	)
}

interface PropsParams {
	size?: 'small' | 'default' | 'large'
	tip?: ReactNode
}

const FcSpin: FC<PropsParams> = ({ size, tip }) => {
	return <Spin tip={tip} size={size} indicator={<CubeGrid />} />
}

export default FcSpin
