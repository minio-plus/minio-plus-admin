<template>
	<div class="table-container">
		<vab-query-form>
			<vab-query-form-left-panel>
				<el-button type="primary" @click="openEdit">
					创建桶
					<i class="el-icon-coin el-icon--right"></i>
				</el-button>
			</vab-query-form-left-panel>
			<vab-query-form-right-panel></vab-query-form-right-panel>
		</vab-query-form>

		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="index" width="50"></el-table-column>
			<el-table-column prop="name" label="名称"></el-table-column>
			<!-- <el-table-column label="标签">
				<template slot-scope="scope">
					<el-tag>标签一</el-tag>
					<el-tag type="success">标签二</el-tag>
					<el-tag type="info">标签三</el-tag>
					<el-tag type="warning">标签四</el-tag>
					<el-tag type="danger">标签五</el-tag>
				</template>
			</el-table-column> -->
			<el-table-column prop="creationDate" label="创建时间"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
						@click="switchObjectView(scope.row)"
						type="text"
						size="small"
					>
						对象
					</el-button>
					<el-dropdown
						class="el-button el-button--text el-button--small"
						@command="switchDropdown"
					>
						<span class="el-dropdown-link">
							更多
							<i class="el-icon-arrow-down"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item :command="{ code: 1, data: scope.row }">
								标签
							</el-dropdown-item>
							<el-dropdown-item :command="{ code: 2, data: scope.row }">
								删除
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>

		<table-edit ref="tableEdit" @complete="loadTable"></table-edit>
	</div>
</template>
<script>
import TableEdit from './components/TableEdit'
import { getBucketList, deleteBucket } from '@/api/bucket'

export default {
	components: { TableEdit },
	data() {
		return {
			tableData: [],
		}
	},
	created() {
		this.loadTable()
	},
	methods: {
		loadTable() {
			getBucketList().then((res) => {
				this.tableData = res.data
			})
		},
		switchObjectView(row) {
			this.$router.push({
				name: 'Object',
				params: {
					bucketName: row.name,
				},
			})
		},
		switchDropdown(command) {
			console.log(command)
			switch (command.code) {
				case 1:
					break
				case 2:
					this.removeBucket(command.data)
					break
			}
		},
		removeBucket(data) {
			this.$confirm('删除 Bucket 后将不可恢复，确定要删除吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {

					deleteBucket({ name: data.name }).then((res) => {
						this.$message({
							type: 'success',
							message: '操作成功!',
						})
						this.loadTable()
					})
				
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					})
				})
		},
		openEdit() {
			this.$refs.tableEdit.show()
		},
	},
}
</script>
<style>
.el-dropdown-link {
	cursor: pointer;
	color: #409eff;
	font-size: 12px;
}
.el-icon-arrow-down {
	font-size: 12px;
}
</style>