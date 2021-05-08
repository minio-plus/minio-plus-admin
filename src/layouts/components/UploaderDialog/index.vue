<template>
	<div>
		<el-dialog title="任务" :visible.sync="dialogVisible" :before-close="handleClose" append-to-body>
			<uploader></uploader>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">关 闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import Uploader from '@/views/uploader/index'

export default {
	components: {
		Uploader,
	},
	name: 'UploaderDialog',
	data() {
		return {
			dialogVisible: false,
		}
	},
	methods: {
		show(){
			this.dialogVisible = true;
		},
		handleClose(done) {
			this.$confirm('确认关闭？')
				.then((_) => {
					done()
				})
				.catch((_) => {})
		},
	},
}
</script>