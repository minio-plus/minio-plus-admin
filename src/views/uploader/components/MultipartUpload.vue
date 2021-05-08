<template>
	<div class="multipart-upload-container">
		<dashboard v-if="display" :uppy="uppy" :plugins="['Webcam']" />
		<div v-if="display === false">在使用上传前，你需要在对象管理功能内选择一个桶。<router-link :to="{path: '/object/index'}">去选择</router-link></div>
	</div>
</template>

<script>
import {
	initiateMultipartUpload,
	getPresignedUrl,
	getPresignUploadPartUrl,
	getUploadPartList,
} from '@/api/object'

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
			display: false
		}
	},
	created() {},
	computed: {
		uppy: function () {
			let _uppy = new Uppy({
				locale: Locale,
				onBeforeFileAdded: (currentFile, files) => {
					let bucketName = this.$store.getters['upload/bucketName'];
					let prefix = this.$store.getters['upload/prefix'];
					
					let objectName = currentFile.name;
					if(prefix){
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
				createMultipartUpload(file) {
					// 创建部分上传
					return initiateMultipartUpload({
						bucketName: file.meta.bucketName,
						key: file.name,
					}).then((res) => res.data)
				},
				listParts(file, partData) {
					// 获取上传部分列表
					return getUploadPartList(
						Object.assign(
							{
								bucketName: file.meta.bucketName,
							},
							partData
						)
					).then((res) => res.data)
				},
				completeMultipartUpload(file, partData) {
					return getPresignedUrl({
						bucketName: file.meta.bucketName,
						objectName: file.name
					}).then((res) => {
						return {
							location: res.data,
						}
					})
				},
				prepareUploadPart(file, partData) {
					// 获取签名Url
					return getPresignUploadPartUrl({
						bucketName: file.meta.bucketName,
						key: partData.key,
						partNumber: partData.partNumber,
						uploadId: partData.uploadId
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
		}
	},
	watch: {
		bucketName: {
			immediate: true,
			handler: function(val, oldVal) {
				if(val){
					this.display = true;
				}else{
					this.display = false;
				}
			}
		}
	},
	methods: {},
}
</script>
<style>
.multipart-upload-container{
	width: 100%;
}
</style>