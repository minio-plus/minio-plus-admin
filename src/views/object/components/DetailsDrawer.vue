<template>
	<el-drawer
		title="详情"
		:visible.sync="drawer"
		:direction="direction"
		:before-close="handleClose"
		:modal="false"
	>
		<div class="info">
			<el-row :gutter="20">
				<el-col :span="24">
					<el-image
						:src="bucketURL + '/' + data.objectName"
						:preview-src-list="srcList"
					></el-image>
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<el-col :span="4" class="text-align-right">文件名</el-col>

				<el-col :span="20">
					{{ data.objectName }}
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<el-col :span="4" class="text-align-right">ETag</el-col>

				<el-col :span="20">
					{{ data.etag }}
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<el-col :span="4" class="text-align-right">URL</el-col>

				<el-col :span="20">
					<el-link :href="bucketURL + '/' + data.objectName" type="primary">{{ bucketURL + '/' + data.objectName }}</el-link>
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<el-col :span="4" class="text-align-right">类型</el-col>

				<el-col :span="20">
					{{ data.contentType }}
				</el-col>
			</el-row>
		</div>
	</el-drawer>
</template>
<script>
import { fileServerURL } from '@/config'

export default {
	data() {
		return {
			drawer: false,
			direction: 'rtl',
			data: {},
			srcList: [],
			bucketURL: ''
		}
	},
	methods: {
		show(row) {
			this.drawer = true
			this.data = row
			this.bucketURL = fileServerURL + '/' + row.bucketName
			this.srcList.push(this.bucketURL + '/' + this.data.objectName)
		},
		handleClose(done) {
			done()
		},
	},
}
</script>
<style scoped>
.info{
	padding: 20px;
}
.info > .el-row{
	padding: 10px 0;
}
.text-align-right {
	text-align: right;
}
</style>