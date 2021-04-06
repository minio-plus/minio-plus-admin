<template>
	<el-dialog
		title="上传文件"
		:visible.sync="dialogVisible"
		:before-close="handleClose"
	>
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
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		</span>
	</el-dialog>
</template>
<script>
export default {
    data(){
        return {
            dialogVisible: false
        }
    },
    created(){

    },
    methods: {
        show(){
            this.dialogVisible = true;
        },
		handleClose(done){
			done()
		}
    }
}
</script>

<style scoped>
.upload-demo{
    width: 100%;
}
</style>