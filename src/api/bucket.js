import request from '@/utils/request'

const BASE_PATH = '/bucket';

export function getBucketList(params) {
    return request({
        url: BASE_PATH + '/list',
        method: 'get',
        params
    })
}