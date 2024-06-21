import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import FcLayout, { FcHeader, FcContent } from '@/component/Layout'
import { Form, Input, Row, Col, message, Button } from 'antd'
import { usePasswordRest, useSmsCode } from '@/service/hooks/userInfo'
import Header from '@/component/Header'
import { useProfile } from '@/context/ThemeModeProvider'
import bgcImg from '@/assets/img/bgc.png'
import backImg from '@/assets/img/back.png'

import './index.scss'

const ForgotPassword = (): React.ReactNode => {
	const { themeStatus } = useProfile()
	const navigate = useNavigate()
	const [second, setSecond] = useState<number>(60)
	const [status, setStatus] = useState<boolean>(false)
	const [success, setSuccess] = useState<boolean>(false)
	const { run: codeRun } = useSmsCode()
	const { run: passwordRestRun } = usePasswordRest()
	const form = useRef<any>({})
	useEffect(() => {
		if (!status) return
		const timer = setInterval(() => {
			if (second === 0) {
				clearInterval(timer)
				setStatus(false)
				setSecond(60)
				return
			}
			const num = second - 1
			setSecond(num)
		}, 1000)
		return () => {
			clearInterval(timer)
		}
	}, [status, second])

	const onSendCode = async () => {
		const mobile = form.current.getFieldValue('mobile')
		if (!mobile) {
			message.error('请输入手机号！')
			return
		}
		const res = await codeRun({ mobile })
		if (res.status < 400) {
			setStatus(true)
		}
	}

	const onFinish = async (values: any) => {
		const res = await passwordRestRun({ ...values })
		console.log(res)
		if (res.status < 400) {
			setSuccess(true)
			localStorage.setItem('USER_TOKEN', res.data.access_token)
		} else {
			message.error(res.data.detail)
		}
	}

	const onEnter = () => {
		window.location.href = `${window.location.origin}/`
	}
	return (
		<div className="forgot-password-wrapper public-wrapper">
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
						{!success ? (
							<div className="flex-x-center form-content">
								<div className="form-info">
									<div className="flex-x-start mb-20">
										<img
											onClick={() => navigate('/sign_in')}
											className="pointer"
											style={{ width: '36px', height: '36px', marginRight: '8px' }}
											src={backImg}
											alt=""
										/>
										<h3 className="fs-28 fs-bold">忘记密码</h3>
									</div>
									<Form
										name="basic"
										ref={form}
										labelCol={{ span: 24 }}
										wrapperCol={{ span: 24 }}
										onFinish={onFinish}
										autoComplete="off">
										<Form.Item
											label=""
											name="mobile"
											rules={[
												() => ({
													validator(_, value) {
														const reg_tel =
															/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
														if (!reg_tel.test(value)) {
															return Promise.reject(new Error('请输入有效的手机号!'))
														}
														return Promise.resolve()
													}
												})
											]}>
											<Input maxLength={11} placeholder=" 请输入手机号" />
										</Form.Item>
										<Form.Item label="">
											<Row gutter={0}>
												<Col span={16}>
													<Form.Item
														name="code"
														style={{ marginBottom: '0px' }}
														rules={[
															() => ({
																validator(_, value) {
																	console.log(value)
																	if (!value) {
																		return Promise.reject(new Error('请输入6位有效的验证码!'))
																	} else if (value.length !== 6) {
																		return Promise.reject(new Error('请输入6位有效的验证码!'))
																	}
																	return Promise.resolve()
																}
															})
														]}>
														<Input placeholder=" 短信验证码" />
													</Form.Item>
												</Col>
												<Col span={8}>
													<div className="flex-x-end">
														{status ? (
															<Button
																style={{ width: '102px', height: '40px' }}
																type="default">{`${second} 秒`}</Button>
														) : (
															<Button
																type="primary"
																style={{ height: '40px' }}
																onClick={onSendCode}>
																获取验证码
															</Button>
														)}
													</div>
												</Col>
											</Row>
										</Form.Item>
										<Form.Item
											label=""
											name="password"
											rules={[
												() => ({
													validator(_, value) {
														const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/
														if (!reg.test(value)) {
															return Promise.reject(
																new Error('请输入8-16位密码，包含大小写字母和数字!')
															)
														}
														return Promise.resolve()
													}
												})
											]}>
											<Input.Password placeholder="请输入新密码" />
										</Form.Item>
										<Form.Item
											label=""
											name="repassword"
											rules={[
												({ getFieldValue }) => ({
													validator(_rule, value) {
														if (!value || getFieldValue('password') === value) {
															return Promise.resolve()
														}
														return Promise.reject('新密码与确认新密码不同！')
													}
												})
											]}>
											<Input.Password placeholder="请确认新密码" />
										</Form.Item>
										<Form.Item>
											<div className="flex-x-end">
												<Button
													style={{
														width: '100%',
														fontSize: '16px',
														fontWeight: 'bold',
														height: '40px'
													}}
													type="primary"
													htmlType="submit">
													提交修改
												</Button>
											</div>
										</Form.Item>
									</Form>
									<p className="fs-14 text-center">
										<span>当前账号已存在 ？</span>
										<span
											onClick={() => navigate('/sign_in')}
											style={{
												textDecoration: 'underline',
												color: '#c280ff'
											}}
											className="pointer">
											{' '}
											立即登录
										</span>
									</p>
								</div>
							</div>
						) : (
							<div className="flex-x-center" style={{ width: '100%', height: '100%' }}>
								<div className="success-wrapper">
									<h3 className="fs-22 fs-bold text-center mb-30">
										欢迎来到 <span className="color-c280ff">《私募基金募资管理平台》</span>
									</h3>
									<p className="fs-14 color-333 text-center mb-20">恭喜你，密码修改完成！</p>
									<Button
										onClick={onEnter}
										style={{ width: '100%', fontSize: '16px', fontWeight: 'bold', height: '36px' }}
										type="primary">
										立即登录
									</Button>
								</div>
							</div>
						)}
					</div>
				</FcContent>
			</FcLayout>
		</div>
	)
}

export default ForgotPassword
