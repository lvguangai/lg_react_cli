import { FC } from 'react'

import './index.scss'

interface ParamsProps {
	list: {
		label: string
		value: number
	}[]
	active: number
	setActive: (num: number) => void
	fontSize?: number
}
const FcTab: FC<ParamsProps> = ({ list, active, setActive, fontSize = 15 }) => {
	return (
		<div className="fc-tabs-list box-padding">
			{list.map((item, i) => {
				return (
					<div
						key={i}
						className={`tabs-item ${active === item.value ? 'active' : ''}`}
						onClick={() => setActive(item.value)}>
						<p className="mb-5 text-center" style={{ fontSize: `${fontSize}px` }}>
							{item.label}
						</p>
					</div>
				)
			})}
		</div>
	)
}

export default FcTab
