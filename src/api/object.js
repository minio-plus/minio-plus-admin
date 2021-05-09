import request from '@/utils/request'

const BASE_PATH = '/object';

/**
 * 获取对象列表
 * @param {*} data 
 * @returns 
 */
export function getObjectList(data) {
    return request({
        url: BASE_PATH + '/list',
        method: 'post',
        data
    })
}

/**
 * 创建文件夹
 * @param {*} data 
 * @returns 
 */
export function createFolder(data) {
    return request({
        url: BASE_PATH + '/folder',
        method: 'post',
        data
    })
}

/**
 * 删除对象
 * @param {*} params 
 * @returns 
 */
export function removeObject(params) {
    return request({
        url: BASE_PATH,
        method: 'delete',
        params
    })
}