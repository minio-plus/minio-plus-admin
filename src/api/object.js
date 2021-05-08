import request from '@/utils/request'
import { fileServerURL } from '@/config'

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
 * 获取签名url
 * @param {*} params 
 * @returns 
 */
export function getPresignedUrl(params) {
    return request({
        url: BASE_PATH + '/presigned/url',
        method: 'get',
        params
    })
}

/**
 * 获取多部分上传签名url
 * @param {*} params 
 * @returns 
 */
export function getPresignUploadPartUrl(params) {
    return request({
        url: BASE_PATH + '/presigned/url/uploadpart',
        method: 'get',
        params
    })
}

/**
 * 创建多部分上传
 * @param {*} data 
 * @returns 
 */
export function initiateMultipartUpload(data) {
    return request({
        url: BASE_PATH + '/upload/multipart/initiate',
        method: 'post',
        data
    })
}

/**
 * 合并上传部分
 * @param {*} data 
 * @returns 
 */
export function composeUploadPart(data) {
    return request({
        url: BASE_PATH + '/upload/part/compose',
        method: 'post',
        data
    })
}

/**
 * 获取上传部分
 * @param {*} params 
 * @returns 
 */
export function getUploadPartList(params) {
    return request({
        url: BASE_PATH + '/upload/part/list',
        method: 'get',
        params
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

/**
 * 获取多部分上传列表
 * @param {*} params 
 * @returns 
 */
export function getMultipartUploadList(params) {
    return request({
        url: BASE_PATH + '/multipart-upload/list',
        method: 'get',
        params
    })
}