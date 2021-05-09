import request from '@/utils/request'

const BASE_PATH = '/multipart/upload';

/**
 * 获取多部分上传列表
 * @param {*} params 
 * @returns 
 */
export function getMultipartUploadList(params) {
    return request({
        url: BASE_PATH + '/list',
        method: 'get',
        params
    })
}

/**
 * 创建多部分上传
 * @param {*} data 
 * @returns 
 */
export function createMultipartUpload(data) {
    return request({
        url: BASE_PATH + '/create',
        method: 'post',
        data
    })
}

/**
 * 完成多部分上传
 * @param {*} data 
 * @returns 
 */
export function completeMultipartUpload(data) {
    return request({
        url: BASE_PATH + '/complete',
        method: 'post',
        data
    })
}