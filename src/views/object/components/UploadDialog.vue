<template>
	<el-dialog
		title="上传文件"
		:visible.sync="dialogVisible"
		:before-close="handleClose"
	>
		<el-form ref="form" :model="form" label-width="100px">
			<el-form-item label="上传至">
				<el-radio-group v-model="uploadIn">
					<el-radio :label="0" border>默认目录</el-radio>
					<el-radio :label="1" border>指定目录</el-radio>
				</el-radio-group>

				<el-input v-model="form.path" v-if="uploadIn === 1">
					<template slot="prepend">{{ bucketURL }}</template>
				</el-input>
			</el-form-item>
			<el-form-item label="待上传文件">
				<el-upload
					class="upload-demo"
					drag
					action="https://jsonplaceholder.typicode.com/posts/"
					multiple
				>
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">
						将文件拖到此处，或
						<em>点击上传</em>
					</div>
					<div class="el-upload__tip" slot="tip">
						只能上传jpg/png文件，且不超过500kb
					</div>
				</el-upload>
			</el-form-item>

			<el-form-item label="存储类型">
				<el-radio-group v-model="form.storageClass">
					<el-radio label="STANDARD" border>标准</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="用户元数据">
			</el-form-item>
		</el-form>

		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		</span>
	</el-dialog>
</template>
<script>
import { fileServerURL } from '@/config'

export default {
	data() {
		return {
			dialogVisible: false,
			form: {
				path: '',
				storageClass: 'STANDARD',
				userMetaData: {}
			},
			uploadIn: 0,
			bucketURL: ''
		}
	},
	created() {},
	methods: {
		show(data) {
			this.dialogVisible = true
			this.bucketURL = fileServerURL + '/' + data.bucketName;
		},
		handleClose(done) {
			done()
		},
	},
}
</script>

<style scoped>
.upload-demo {
	width: 100%;
}
</style>