import request from '@/utils/request'

const BASE_PATH = '/presign';

/**
 * 获取签名url
 * @param {*} params 
 * @returns 
 */
export function getPresignObject(params) {
    return request({
        url: BASE_PATH,
        method: 'get',
        params
    })
}

/**
 * 获取多部分上传签名
 * @param {*} params 
 * @returns 
 */
export function getPresignUploadPart(params) {
    return request({
        url: BASE_PATH + '/upload/part',
        method: 'get',
        params
    })
}

/**
 * 获取预签名终止多部分上传
 * @param {*} params 
 * @returns 
 */
export function getPresignAbortMultipartUpload(params) {
    return request({
        url: BASE_PATH + '/multipart/upload/abort',
        method: 'get',
        params
    })
}

/**
 * 合并上传部分
 * @param {*} data 
 * @returns 
 */
export function getPresignCompleteMultipartUpload(data) {
    return request({
        url: BASE_PATH + '/multipart/upload/complete',
        method: 'post',
        data
    })
}