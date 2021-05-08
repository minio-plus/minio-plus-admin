import request from '@/utils/request'

const BASE_PATH = '/bucket';

/**
 * 获取桶列表
 * @param {*} params 
 * @returns 
 */
export function getBucketList(params) {
    return request({
        url: BASE_PATH + '/list',
        method: 'get',
        params
    })
}

/**
 * 创建桶
 * @param {*} data 
 * @returns 
 */
export function createBucket(data) {
    return request({
        url: BASE_PATH,
        method: 'post',
        data
    })
}

/**
 * 删除桶
 * @param {*} params 
 * @returns 
 */
export function deleteBucket(params) {
    return request({
        url: BASE_PATH,
        method: 'delete',
        params
    })
}

/**
 * 获取桶生命周期规则列表
 * @param {*} params 
 * @returns 
 */
export function getBucketLifecycleRuleList(params) {
    return request({
        url: BASE_PATH + "/lifecycle/rule/list",
        method: 'get',
        params
    })
}

/**
 * 创建桶生命周期规则
 * @param {*} data 
 * @returns 
 */
export function creareBucketLifecycleRule(data) {
    return request({
        url: BASE_PATH + "/lifecycle/rule",
        method: 'post',
        data
    })
}

/**
 * 删除桶生命周期规则
 * @param {*} params 
 * @returns 
 */
export function deleteBucketLifecycleRule(params) {
    return request({
        url: BASE_PATH + "/lifecycle/rule",
        method: 'delete',
        params
    })
}