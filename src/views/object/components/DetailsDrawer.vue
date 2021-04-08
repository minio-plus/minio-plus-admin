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
						:src="'http://47.112.226.124:9100/liangwei/' + data.objectName"
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
					<el-link :href="'http://47.112.226.124:9100/liangwei/' + data.name" type="primary">{{ 'http://47.112.226.124:9100/liangwei/' + data.name }}</el-link>
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
export default {
	data() {
		return {
			drawer: false,
			direction: 'rtl',
			data: {},
			srcList: [],
		}
	},
	methods: {
		show(row) {
			this.drawer = true
			this.data = row
			this.srcList.push('http://47.112.226.124:9100/liangwei/' + this.data.name)
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