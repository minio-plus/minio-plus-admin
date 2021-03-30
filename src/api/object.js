import request from '@/utils/request'

const BASE_PATH = '/object';

export function getObjectList(params) {
    return request({
        url: BASE_PATH + '/list',
        method: 'get',
        params
    })
}