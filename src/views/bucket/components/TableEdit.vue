<template>
	<el-dialog
		title="创建"
		:visible.sync="dialogVisible"
		:before-close="handleClose"
	>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="名称">
				<el-input v-model="form.name"></el-input>
			</el-form-item>

			<!-- <el-form-item label="地域">
				<el-input v-model="form.region"></el-input>
			</el-form-item> -->
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="save">保 存</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { createBucket } from '@/api/bucket'

export default {
	data() {
		return {
			dialogVisible: false,
			form: {
				name: '',
			},
		}
	},
	created() {},
	methods: {
		show() {
			this.dialogVisible = true
		},
		save() {
			createBucket(this.form).then((res) => {
				this.$message({
					message: '操作成功',
					type: 'success',
				})
				this.dialogVisible = false
				this.$emit('complete')
			})
		},
		handleClose(done){
			done()
		}
	},
}
</script>