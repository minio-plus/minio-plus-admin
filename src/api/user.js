import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA, tokenName } from '@/config'

const BASE_PATH = '/user';

export async function login(data) {
    if (loginRSA) {
        data = await encryptedData(data)
    }
    return request({
        url: BASE_PATH + '/login',
        method: 'post',
        data,
    })
}

export function getUserInfo(accessToken) {
    return request({
        url: BASE_PATH + '/current',
        method: 'get',
        params: {
            [tokenName]: accessToken,
        },
    })
}

export function logout() {
    return request({
        url: BASE_PATH + '/logout',
        method: 'get',
    })
}

export function register() {
    return request({
        url: BASE_PATH + '/register',
        method: 'post',
    })
}