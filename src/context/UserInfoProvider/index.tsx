import React, { createContext, useContext, useState, FC, useLayoutEffect } from 'react'
import { useUserInfo, useTouristsToken } from '@/service/hooks/userInfo'

export interface UserInfoParams {
	avatar: string
	uuid: string
	nickname: string
	mobile: string
	is_vip: boolean
	vip_exp: string
	onInit: () => void
}
type UserParams = Omit<UserInfoParams, 'onInit'>
const init: UserParams = {
	avatar: '',
	uuid: '',
	mobile: '',
	nickname: '',
	is_vip: false,
	vip_exp: ''
}
const UserContext = createContext({} as UserInfoParams)
const UserInfoProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [initialState, setInitialState] = useState<UserParams>(init)
	const { run: getUser } = useUserInfo()
	const { run: touristsTokenRun } = useTouristsToken()
	useLayoutEffect(() => {
		const onGetUser = async () => {
			const res = await getUser()
			if (res?.status < 400) {
				setInitialState(res.data)
			} else {
				// message.error(res?.data?.message);
			}
		}
		const userToken = localStorage.getItem('USER_TOKEN')
		if (userToken) {
			onGetUser()
		}

		const onGetTourists = async () => {
			const res = await touristsTokenRun()
			if (res?.status < 400) {
				console.log(res)
				localStorage.setItem('TOURISTS_TOKEN', res.data.access_token)
			}
		}
		const touristsUserToken = localStorage.getItem('TOURISTS_TOKEN')
		if (!touristsUserToken) {
			onGetTourists()
		}
	}, [getUser, touristsTokenRun])

	const onInit = () => {
		setInitialState(init)
	}
	return <UserContext.Provider value={{ ...initialState, onInit }}>{children}</UserContext.Provider>
}

const useUser = (): UserInfoParams => useContext(UserContext)
// eslint-disable-next-line react-refresh/only-export-components
export { UserInfoProvider, useUser }
export default UserInfoProvider
