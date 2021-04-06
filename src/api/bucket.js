import request from '@/utils/request'

const BASE_PATH = '/bucket';

export function getBucketList(params) {
    return request({
        url: BASE_PATH + '/list',
        method: 'get',
        params
    })
}

export function createBucket(data) {
    return request({
        url: BASE_PATH,
        method: 'post',
        data
    })
}

export function deleteBucket(params) {
    return request({
        url: BASE_PATH,
        method: 'delete',
        params
    })
}