import request from '@/utils/request'

const BASE_PATH = '/upload';

/**
 * 获取上传部分
 * @param {*} params 
 * @returns 
 */
export function getUploadPartList(params) {
    return request({
        url: BASE_PATH + '/part/list',
        method: 'get',
        params
    })
}