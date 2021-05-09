<template>
	<el-drawer title="详情" :visible.sync="drawer" :direction="direction" :before-close="handleClose" :modal="false">
		<div class="info">
			<el-row :gutter="20">
				<el-col :span="24">
					<el-image :src="fileUrl" :preview-src-list="srcList" v-if="fileType === 'image' || fileType === 'file'">
						<div slot="error" class="image-slot">
							此文件不支持预览
						</div>
					</el-image>
					<video class="el-image__inner el-image__preview" :src="fileUrl" controls="controls" v-if="fileType === 'video'">
						您的浏览器不支持 video 标签。
					</video>
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
					<el-link :href="fileUrl" type="primary">{{ fileUrl }}</el-link>
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
import { getPresignObject } from '@/api/presign'

export default {
	data() {
		return {
			drawer: false,
			direction: 'rtl',
			data: {},
			srcList: [],
			fileUrl: '',
			fileType: '',
		}
	},
	methods: {
		show(row) {
			getPresignObject({
				bucketName: row.bucketName,
				key: row.objectName,
			}).then((res) => {
				this.fileUrl = res.data
				this.srcList.push(res.data)
			})
			this.drawer = true
			this.data = row
			this.handlerFileType(row.objectName)
		},
		handlerFileType(name) {
			switch (name.substring(name.lastIndexOf('.') + 1, name.length)) {
				case 'jpg':
					this.fileType = 'image'
					break
				case 'png':
					this.fileType = 'image'
					break
				case 'mp4':
					this.fileType = 'video'
					break
				default:
					this.fileType = 'file'
					break
			}
		},
		handleClose(done) {
			this.fileType = 'file'
			done()
		},
	},
}
</script>
<style scoped>
.info {
	padding: 20px;
}
.info > .el-row {
	padding: 10px 0;
}
.text-align-right {
	text-align: right;
}
</style>