import { FC, ReactNode } from 'react'
import './index.scss'

interface ParamsProps {
	children?: ReactNode
}

const FcLayout: FC<ParamsProps> = ({ children }) => {
	return (
		<div className="layout-content">
			<div className="layout-set">{children}</div>
		</div>
	)
}

export default FcLayout

export const FcHeader: FC<ParamsProps> = ({ children }) => {
	return <div className="content-shrink">{children}</div>
}

export const FcContent: FC<ParamsProps> = ({ children }) => {
	return (
		<div className="content-shrink auto-height">
			<div className="auto-height__wrapper">{children}</div>
		</div>
	)
}

export const FcFooter: FC<ParamsProps> = ({ children }) => {
	return <div className="content-shrink">{children}</div>
}
