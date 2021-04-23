<template>
	<el-dialog
		title="创建文件夹"
		:visible.sync="dialogVisible"
		:before-close="handleClose"
	>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="文件夹名">
				<el-input v-model="form.objectName" maxlength="254" show-word-limit></el-input>
				<ul>
					<li>不允许使用表情符，请使用符合要求的 UTF-8 字符；</li>
					<li>/ 用于分割路径，可快速创建子目录，但不要以 / 或 \ 开头，不要出现连续的 /；</li>
					<li>不允许出现名为 .. 的子目录；</li>
					<li>总长度控制在 1~254 个字符。</li>
				</ul>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="save">保 存</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { createFolder } from '@/api/object';

export default {
	data() {
		return {
			dialogVisible: false,
			form: {
				prefixs: [],
				bucketName: '',
				objectName: ''
			}
		}
	},
	created() {},
	methods: {
		show(args) {
			this.dialogVisible = true;
			this.form.bucketName = args.bucketName;
			this.form.prefixs = args.prefixs;
		},
		handleClose(done) {
			done()
		},
		save(){
			createFolder(this.form).then(res => {
				this.dialogVisible = false;
				this.$emit('success')
			})
		}
	},
}
</script>