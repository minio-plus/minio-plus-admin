import request from '@/utils/request'
import { fileServerURL } from '@/config'

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

export function getPresignedFormData(params) {
    return request({
        url: BASE_PATH + '/presigned/formdata',
        method: 'get',
        params
    })
}

export function getPresignedUrl(params) {
    return request({
        url: BASE_PATH + '/presigned/url',
        method: 'get',
        params
    })
}

export function createMultipartUpload(params) {
    return request({
        url: BASE_PATH + '/uploadmultipart',
        method: 'post',
        params
    })
}

export function composeUploadPart(data) {
    return request({
        url: BASE_PATH + '/upload/part/compose',
        method: 'post',
        data
    })
}

export function getUploadPart(params) {
    return request({
        url: BASE_PATH + '/upload/part',
        method: 'get',
        params
    })
}

export function uploadObjectToServer(bucketName, data) {
    return request({
        url: fileServerURL + '/' + bucketName,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

export function removeObject(params) {
    return request({
        url: BASE_PATH,
        method: 'delete',
        params
    })
}