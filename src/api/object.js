import request from '@/utils/request'

const BASE_PATH = '/object';

export function getObjectList(data) {
    return request({
        url: BASE_PATH + '/list',
        method: 'post',
        data
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

export function removeObject(params){
    return request({
        url: BASE_PATH,
        method: 'delete',
        params
    })
}