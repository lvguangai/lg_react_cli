import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/context/UserInfoProvider'
import FcIcon from '../FcIcon'
import { Popover, Divider, Button } from 'antd'
import userImg from '@/assets/img/user.png'
import logoImg from '@/assets/img/logo.png'
import './index.scss'

interface ParamsProps {
	status: boolean
	title?: string
	signIsStatus?: boolean
}

const Header: FC<ParamsProps> = ({ title = '私募基金募资管理平台', signIsStatus = false }) => {
	const { nickname, onInit } = useUser()
	const navigate = useNavigate()
	const onSignOut = () => {
		localStorage.removeItem('USER_TOKEN')
		onInit()
		navigate('/sign_in')
	}

	const content = (
		<div className="user-setting">
			<div className="user-tip">{nickname}</div>
			<Divider style={{ margin: '2px 0' }}></Divider>
			<div onClick={onSignOut} className="option-wrap flex-x-start">
				<div className="icon-wrap flex-x-start">
					<FcIcon
						type="icon-tuichu"
						style={{ fontSize: '16px', color: 'var(--font-color-public)' }}></FcIcon>
				</div>
				<span className="fs-14"> 退出</span>
			</div>
		</div>
	)
	return (
		<header className="header flex-x-between">
			{/*登录状态*/}
			{signIsStatus ? (
				<>
					<div className="flex-x-center pointer">
						<img src={logoImg} className="logo-wrap" alt="" />
						<span className="fs-16 fw-bold">{title}</span>
					</div>
					<div>
						<Popover placement="bottomRight" title="" content={content} arrow={false}>
							<img className="user-wrap" src={userImg} alt="" />
						</Popover>
					</div>
				</>
			) : (
				<>
					{/*未登录状态*/}
					<div className="flex-x-center pointer">
						<img src={logoImg} className="logo-wrap" alt="" />
						<span className="fs-16 fw-bold">{title}</span>
					</div>
					<div className="btn-wrap">
						<Button
							onClick={() => navigate('/sign_in')}
							style={{ marginRight: '15px', width: '116px' }}
							type="default">
							立即登录
						</Button>
						<Button type="primary" onClick={() => navigate('/sign_up')} style={{ width: '116px' }}>
							注册
						</Button>
					</div>
				</>
			)}
		</header>
	)
}

export default Header
