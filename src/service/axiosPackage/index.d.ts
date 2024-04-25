/* eslint-disable @typescript-eslint/no-explicit-any */
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

export interface AxiosRequest {
    baseURL?: string;
    url: string;
    data?: any;
    params?: any;
    method?: Method;
    timeout?: number;
    responseType?: ResponseType;
    headers?: any;
}

export interface CustomResponse {
    readonly status: boolean;
    readonly message: string;
    data: any;
    origin?: any;
}
