<template>
	<div>
		<el-dialog title="提示" :visible.sync="dialogVisible" :before-close="handleClose">
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="uploadId" label="上传标识">
				</el-table-column>
				<el-table-column prop="key" label="键">
				</el-table-column>
				<el-table-column prop="storageClass" label="存储类">
					<template slot-scope="scope">
						{{ scope.row.storageClass == 'STANDARD' ? '标准' : '' }}
					</template>
				</el-table-column>
				<el-table-column prop="initiated" label="开始时间">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope" v-if="scope.row.etag !== 'A'">
						<el-button type="text" size="small">
							查看
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">关 闭</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
import { getMultipartUploadList } from '@/api/multipart.upload'

export default {
	data() {
		return {
			dialogVisible: false,
			bucketName: '',
			tableData: [],
		}
	},
	methods: {
		show(args) {
			this.bucketName = args.bucketName
			this.loadTable()
			this.dialogVisible = true
		},
		loadTable() {
			console.log(this.bucketName)
			getMultipartUploadList({ bucketName: this.bucketName }).then((res) => {
				this.tableData = res.data
			})
		},
		handleClose(done) {
			done()
		},
	},
}
</script>