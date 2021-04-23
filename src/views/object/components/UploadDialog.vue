<template>
	<el-dialog title="上传文件" :visible.sync="dialogVisible" :before-close="handleClose">
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
				<uploader :options="options" class="uploader-example">
					<uploader-unsupport></uploader-unsupport>
					<uploader-drop>
						<p><i class="el-icon-upload"></i>将目录或多个文件拖拽到此进行扫描</p>
						<p>文件命名规范：1.使用 UTF-8 编码 2.区分大小写 3.长度必须在 1~1023 字节之间 4. 不能以 / 或者 \ 字符开头</p>
						<uploader-btn class="el-button el-button--primary">选取文件</uploader-btn>
						<uploader-btn class="el-button el-button--primary" :directory="true">选取文件夹</uploader-btn>
					</uploader-drop>
					<uploader-list></uploader-list>
				</uploader>
			</el-form-item>

			<el-form-item label="存储类型">
				<el-radio-group v-model="form.storageClass">
					<el-radio label="STANDARD" border>标准</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="用户元数据">
				<el-tag type="warning" closable :disable-transitions="false" @close="removeTag(key)" v-for="(val, key, index) in form.userMetaData" :key="index">
					{{ key }} : {{ val }}
				</el-tag>

				<el-row class="input-map">
					<el-col :span="10">
						<el-input v-model="userMetaDataMap.key" placeholder="请输入键"></el-input>
					</el-col>
					<el-col :span="10">
						<el-input v-model="userMetaDataMap.value" placeholder="请输入值"></el-input>
					</el-col>
					<el-col :span="4">
						<el-button @click="addUserMetadata">添加</el-button>
					</el-col>
				</el-row>
			</el-form-item>
		</el-form>

		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		</span>
	</el-dialog>
</template>
<script>
import { uploadObject } from '@/api/object'
import { fileServerURL } from '@/config'

export default {
	data() {
		return {
			dialogVisible: false,
			form: {
				path: '',
				storageClass: 'STANDARD',
				userMetaData: {},
			},
			userMetaDataMap: {
				key: '',
				value: '',
			},
			uploadIn: 0,
			bucketURL: '',
			uploader: {
				options: {},
				btn: {},
			},
		}
	},
	created() {},
	methods: {
		show(data) {
			this.dialogVisible = true
			this.bucketURL = fileServerURL + '/' + data.bucketName
		},
		handleClose(done) {
			done()
		},
		addUserMetadata() {
			if (
				this.userMetaDataMap.key !== '' &&
				this.userMetaDataMap.value !== ''
			) {
				this.form.userMetaData[
					this.userMetaDataMap.key
				] = this.userMetaDataMap.value
				this.userMetaDataMap = {
					key: '',
					value: '',
				}
			} else {
				this.$message({
					message: '请输入键值对',
					type: 'warning',
				})
			}
		},
		removeUserMetadata(key) {
			let newUserMetadata = Object.assign({}, this.form.userMetaData)
			delete newUserMetadata[key]
			this.form.userMetaData = newUserMetadata
		},
	},
}
</script>

<style scoped>
.upload-demo {
	width: 100%;
}

.uploader-example {
	font-size: 12px;
	/* box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); */
}
.uploader-example .uploader-btn {
	margin-right: 4px;
}
.uploader-example .uploader-list {
	max-height: 440px;
	overflow: auto;
	overflow-x: hidden;
	overflow-y: auto;
}
</style>