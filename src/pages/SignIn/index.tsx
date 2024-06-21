import React from 'react'
import FcLayout, { FcHeader, FcContent } from '@/component/Layout'
import Header from '@/component/Header'
import FcSignIn from '@/component/FcSignIn'
import { useProfile } from '@/context/ThemeModeProvider'
import bgcImg from '@/assets/img/bgc.png'
import './index.scss'

const SignIn = (): React.ReactNode => {
	const { themeStatus } = useProfile()
	return (
		<div className="login-code-wrapper public-wrapper">
			<FcLayout>
				<FcHeader>
					<Header status={false} />
				</FcHeader>
				<FcContent>
					<div
						className="form-wrapper"
						style={{
							background: `${themeStatus && `url(${bgcImg}) no-repeat center / 100% 100%`}`
						}}>
						<div className="flex-x-center form-content">
							<FcSignIn></FcSignIn>
						</div>
					</div>
				</FcContent>
			</FcLayout>
		</div>
	)
}

export default SignIn
