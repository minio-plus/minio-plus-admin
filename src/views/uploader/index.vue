<template>
	<div class="upload-container">

		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="多部分上传" name="MultipartUpload">
				<el-form ref="form" label-width="80px">
					<el-form-item label="选取文件">
						<multipart-upload></multipart-upload>
					</el-form-item>
				</el-form>
				
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import MultipartUpload from './components/MultipartUpload'

export default {
	components: {
		MultipartUpload,
	},
	data() {
		return {
			activeName: 'MultipartUpload',
		}
	},
	created() {
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event)
		},
	},
}
</script>

<style>
.upload-container {
}
</style>