import axiosPublic from './servicePublic'
import { AxiosRequest, CustomResponse } from './index.d'
class requestMethod {
	// 定义url
	protected baseUrl: string | undefined
	constructor(url: string | undefined) {
		this.baseUrl = url
	}

	// 请求时间
	protected timeout = 120
	private baseAxios({
		baseURL = this.baseUrl,
		timeout = this.timeout,
		method,
		url,
		data,
		params,
		responseType,
		headers
	}: AxiosRequest): Promise<CustomResponse> {
		const http = axiosPublic(baseURL, timeout, headers)
		return new Promise((resolve, reject) => {
			http({
				method,
				url,
				params,
				data,
				responseType
			})
				.then((res: any) => {
					resolve(res)
				})
				.catch((err: any) => {
					const message = err?.data?.errorMessage || err?.message || url + '请求失败'
					reject({ status: false, message, data: null })
				})
		})
	}
	/**
	 * GET类型的网络请求
	 */
	protected getReq({ url, params, responseType }: AxiosRequest): any {
		return this.baseAxios({ method: 'GET', url, params, responseType })
	}

	/**
	 * POST类型的网络请求
	 */
	protected postReq({ url, data, params, responseType, headers }: AxiosRequest): any {
		return this.baseAxios({
			method: 'POST',
			url,
			data,
			params,
			responseType,
			headers
		})
	}

	/**
	 * PUT类型的网络请求
	 */
	protected putReq({ url, data, params, responseType, headers }: AxiosRequest): any {
		return this.baseAxios({
			method: 'PUT',
			url,
			data,
			params,
			responseType,
			headers
		})
	}

	/**
	 * DELETE类型的网络请求
	 */
	protected deleteReq({ url, data, params, responseType }: AxiosRequest): any {
		return this.baseAxios({
			method: 'DELETE',
			url,
			data,
			params,
			responseType
		})
	}
}

export default requestMethod
