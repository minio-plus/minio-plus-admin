<template>
	<div class="multipart-upload-container">
		<dashboard v-if="display" :uppy="uppy" :plugins="['Webcam']" />
		<div v-if="display === false">在使用上传前，你需要在对象管理功能内选择一个桶。<router-link :to="{path: '/object/index'}">去选择</router-link>
		</div>
	</div>
</template>

<script>
import {
	createMultipartUpload as createMultipartUploadApi,
	completeMultipartUpload as completeMultipartUploadApi,
} from '@/api/multipart.upload'
import {
	getPresignUploadPart,
	getPresignAbortMultipartUpload,
	getPresignCompleteMultipartUpload,
} from '@/api/presign'
import { getUploadPartList } from '@/api/upload'

import { Dashboard } from '@uppy/vue'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import Uppy from '@uppy/core'
import Webcam from '@uppy/webcam'
import AwsS3Multipart from '@uppy/aws-s3-multipart'
var Locale = require('@uppy/locales/lib/zh_CN')

export default {
	components: {
		Dashboard,
	},
	data() {
		return {
			display: false,
		}
	},
	created() {},
	computed: {
		uppy: function () {
			let _uppy = new Uppy({
				locale: Locale,
				onBeforeFileAdded: (currentFile, files) => {
					let bucketName = this.$store.getters['upload/bucketName']
					let prefix = this.$store.getters['upload/prefix']

					let objectName = currentFile.name
					if (prefix) {
						objectName = prefix + currentFile.name
					}

					const modifiedFile = {
						...currentFile,
						name: objectName,
						meta: {
							...currentFile.meta,
							bucketName,
						},
					}
					return modifiedFile
				},
			})
			_uppy.use(Webcam)
			_uppy.use(AwsS3Multipart, {
				// 创建多部分上传
				createMultipartUpload(file) {
					// 创建部分上传
					return createMultipartUploadApi({
						bucketName: file.meta.bucketName,
						key: file.name,
						contentType: file.type,
					}).then((res) => res.data)
				},
				// 部分列表
				listParts(file, { uploadId, key }) {
					// 获取上传部分列表
					return getUploadPartList({
						bucketName: file.meta.bucketName,
						uploadId,
						key,
					}).then((res) => res.data)
				},
				// 完成多部分上传
				completeMultipartUpload(file, { uploadId, key, parts, PartNumber }) {
					let partDtos = []
					parts.forEach((part) => {
						partDtos.push({
							eTag: part.ETag,
							partNumber: part.PartNumber,
						})
					})

					return completeMultipartUploadApi({
						bucketName: file.meta.bucketName,
						uploadId,
						key,
						parts: partDtos,
					}).then((res) => {
						return {
							location: res.data,
						}
					})
				},
				// 终止多部分上传
				abortMultipartUpload(file, { uploadId, key }) {
					return getPresignAbortMultipartUpload({
						bucketName: file.meta.bucketName,
						uploadId,
						key,
					}).then((res) => {
						return {
							location: res.data,
						}
					})
				},
				// 准备上传部分
				prepareUploadPart(file, partData) {
					// 获取签名Url
					return getPresignUploadPart({
						bucketName: file.meta.bucketName,
						key: partData.key,
						partNumber: partData.number,
						uploadId: partData.uploadId,
					}).then((res) => {
						return {
							url: res.data,
						}
					})
				},
			})
			return _uppy
		},
		bucketName: function () {
			return this.$store.getters['upload/bucketName']
		},
	},
	watch: {
		bucketName: {
			immediate: true,
			handler: function (val, oldVal) {
				if (val) {
					this.display = true
				} else {
					this.display = false
				}
			},
		},
	},
	methods: {},
}
</script>
<style>
.multipart-upload-container {
	width: 100%;
}
</style>