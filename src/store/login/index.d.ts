export interface UserInfoParams {
	avatar: string
	uuid: string
	nickname: string
	mobile: string
	is_vip: boolean
	vip_exp: string
	memberIsOpen: boolean
	signInIsOpen: boolean
}
export interface ActionParams {
	type: string
	payload: any
}
