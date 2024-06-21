import { useCallback, useState } from 'react'
import api from '@/service/api'
import ProxyCreateSingleton from '@/service/serviceBase'

const fetch = new (ProxyCreateSingleton as any)()

// 注册
export const useSignUp = () => {
	const run = useCallback(
		async (data: {
			mobile: string
			code: string
			password: string
			repassword: string
			invite_code: string
		}) => {
			const res = await fetch.axiosPost(api.SignUp, data)
			return res
		},
		[]
	)
	return {
		run
	}
}

export const usePasswordRest = () => {
	const run = useCallback(
		async (data: { mobile: string; code: string; password: string; repassword: string }) => {
			const res = await fetch.axiosPost(api.PasswordRest, data)
			return res
		},
		[]
	)
	return {
		run
	}
}

// 登录
export const useSignIn = () => {
	const run = useCallback(
		async (
			data: {
				username: string
				password: string
			},
			type: number
		) => {
			const { username, password } = data
			const res = await fetch.axiosPost(
				type === 1 ? api.SignIn : api.PassLogin,
				`username=${username}&password=${password}`,
				{ 'Content-Type': 'application/x-www-form-urlencoded' }
			)
			return res
		},
		[]
	)
	return {
		run
	}
}

// 发送短信验证码
export const useSmsCode = () => {
	const run = useCallback(async (data: { mobile: string }) => {
		const res = await fetch.axiosPost(api.SmsCode, data)
		return res
	}, [])
	return {
		run
	}
}

// 获取用户信息
export const useUserInfo = () => {
	const run = useCallback(async () => {
		const res = await fetch.axiosGet(api.UserInfo, {})
		return res
	}, [])
	return {
		run
	}
}

// 游客token
export const useTouristsToken = () => {
	const run = useCallback(async () => {
		const res = await fetch.axiosPost(api.TouristsToken, {})
		return res
	}, [])
	return {
		run
	}
}

export const useRewardInfo = () => {
	const [info, setInfo] = useState<any>({})
	const run = useCallback(async () => {
		const res = await fetch.axiosGet(api.RewardInfo, {})
		setInfo(res?.data)
	}, [])
	return {
		info,
		run
	}
}
