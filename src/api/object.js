import request from '@/utils/request'

const BASE_PATH = '/object';

export function getObjectList(params) {
    return request({
        url: BASE_PATH + '/list',
        method: 'get',
        params
    })
}

export function createFolder(data) {
    return request({
        url: BASE_PATH + '/folder',
        method: 'post',
        data
    })
}

export function uploadObject(params){
    return request({
        url: BASE_PATH + '/upload',
        method: 'post',
        params
    })
}