<template>
	<el-dialog title="提示" :visible.sync="dialogVisible" :before-close="handleClose">
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="上传至">
				<el-radio-group v-model="uploadIn">
					<el-radio :label="0" border>默认目录</el-radio>
					<el-radio :label="1" border>指定目录</el-radio>
				</el-radio-group>

				<el-input v-model="form.prefix" v-if="uploadIn === 1">
					<template slot="prepend">{{ bucketName }} / </template>
				</el-input>
			</el-form-item>

			<el-form-item label="存储类型">
				<el-radio-group v-model="form.storageClass">
					<el-radio label="STANDARD" border>标准</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="待上传文件">
				<dashboard :uppy="uppy" :plugins="['Webcam']" />
			</el-form-item>
		</el-form>

		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary">确 定</el-button>
		</span>
	</el-dialog>

</template>

<script>
import { createMultipartUpload as createPartUpload, getPresignedUrl, getUploadPart, composeUploadPart } from '@/api/object'

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
			dialogVisible: false,
			bucketName: '',
			uploadIn: 0,
			form: {
				prefix: '',
				storageClass: 'STANDARD',
				userMetaData: {},
			},
			formData: {},
		}
	},
	created() {},
	computed: {
		uppy: function () {
			let bucketName = this.bucketName;
            let prefix = this.form.prefix;
            
            return new Uppy({
                locale: Locale,
            }).use(Webcam).use(AwsS3Multipart, {
                createMultipartUpload(file){
					// 创建部分上传
                    return createPartUpload({
						bucketName,
						key: file.name
					}).then(res => res.data)
                },
                listParts(file, partData){
                    // 获取上传部分
					return getUploadPart(Object.assign({
						bucketName
					}, partData)).then(res => res.data);
                },
				completeMultipartUpload(file, partData) {
					return getPresignedUrl({
                        bucketName,
                        objectName: file.name,
                        method: 'GET'
                    }).then(res => {
                        return {
                            location: res.data
                        }
                    })
				},
                prepareUploadPart(file, partData){
					console.log('签名执行')
                    let method = 'PUT'
					// 获取签名Url
                    return getPresignedUrl({
                        bucketName,
                        objectName: file.name,
                        method
                    }).then(res => {
                        return {
                            url: res.data
                        }
                    })
                }
            })
		},
	},
	methods: {
		show(data) {
			this.dialogVisible = true
			this.bucketName = data.bucketName
		},
		handleClose(done) {
			done()
		},
	},
}
</script>