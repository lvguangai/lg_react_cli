import { FC, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Row, Col, message, Button } from 'antd'
import { useSignIn, useSmsCode } from '@/service/hooks/userInfo'
import FcTab from '@/component/FcTab'

import './index.scss'

const FcSignIn: FC = () => {
	const navigate = useNavigate()
	const [active, setActive] = useState(1)
	const [second, setSecond] = useState<number>(60)
	const [status, setStatus] = useState<boolean>(false)
	const { run: codeRun } = useSmsCode()
	const { run: signInRun } = useSignIn()
	const form = useRef<any>({})
	const tabItem = [
		{
			label: '短信登录',
			value: 1
		},
		{
			label: '密码登录',
			value: 2
		}
	]
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
		const mobile = form.current.getFieldValue('username')
		if (!mobile) {
			message.error('请输入手机号！')
			return
		}
		const res = await codeRun({ mobile })
		if (res?.status < 400) {
			setStatus(true)
		} else {
			message.error(res.data.message)
		}
	}

	const onFinish = async (values: any) => {
		const params = { ...values }
		const res = await signInRun(params, active)
		if (res.status < 400) {
			localStorage.setItem('USER_TOKEN', res?.data?.access_token)
			window.location.href = `${window.location.origin}/`
		} else {
			message.error(res.data.detail)
		}
	}
	return (
		<div className="fc-form-info flex-none">
			<h3 className="fs-22 fs-bold mb-20 text-center">
				欢迎来到 <span className="color-c280ff">《私募基金募资管理平台》</span>
			</h3>
			<section className="mb-25">
				<FcTab
					active={active}
					setActive={(num: number) => {
						setActive(num)
						form.current.setFieldsValue({ password: '' })
					}}
					list={tabItem}
					fontSize={18}
				/>
			</section>
			<Form
				name="basic"
				ref={form}
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				autoComplete="off">
				<Form.Item
					label=""
					name="username"
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
				{active === 1 ? (
					<Form.Item label="">
						<Row gutter={0}>
							<Col span={16}>
								<Form.Item
									name="password"
									style={{ marginBottom: '0px' }}
									rules={[
										() => ({
											validator(_, value) {
												if (!value) {
													return Promise.reject(new Error('请输入6位有效的验证码!'))
												} else if (value.length !== 6) {
													return Promise.reject(new Error('请输入6位有效的验证码!'))
												}
												return Promise.resolve()
											}
										})
									]}>
									<Input placeholder="请输入6位验证码" />
								</Form.Item>
							</Col>
							<Col span={8}>
								<div className="flex-x-end">
									{status ? (
										<Button
											style={{ width: '102px', height: '40px' }}
											type="default">{`${second} 秒`}</Button>
									) : (
										<Button type="primary" style={{ height: '40px' }} onClick={onSendCode}>
											获取验证码
										</Button>
									)}
								</div>
							</Col>
						</Row>
					</Form.Item>
				) : (
					<Form.Item
						label=""
						name="password"
						rules={[
							() => ({
								validator(_, value) {
									const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/
									if (!reg.test(value)) {
										return Promise.reject(new Error('请输入8-16位密码，包含大小写字母和数字!'))
									}
									return Promise.resolve()
								}
							})
						]}>
						<Input.Password placeholder="请输入密码" />
					</Form.Item>
				)}
				<Form.Item>
					<div>
						{active === 2 && (
							<p
								onClick={() => navigate('/forgot_password')}
								className="fs-14 color-555 mb-10 pointer"
								style={{ textAlign: 'right' }}>
								忘记密码？
							</p>
						)}
						<Button
							style={{ width: '100%', fontSize: '16px', fontWeight: 'bold', height: '40px' }}
							type="primary"
							htmlType="submit">
							登录
						</Button>
					</div>
				</Form.Item>
			</Form>
			<p className="fs-14 text-center">
				<span>还没有账号 ？ </span>
				<span
					onClick={() => navigate('/sign_up')}
					style={{
						textDecoration: 'underline',
						color: '#c280ff'
					}}
					className="pointer">
					{' '}
					立即注册
				</span>
			</p>
		</div>
	)
}

export default FcSignIn
