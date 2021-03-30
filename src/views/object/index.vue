<template>
	<div class="table-container">
		<vab-query-form>
			<vab-query-form-left-panel>
				<el-button type="primary">
					上传
					<i class="el-icon-upload el-icon--right"></i>
				</el-button>
				<el-button type="primary">
					新建目录
					<i class="el-icon-folder-add el-icon--right"></i>
				</el-button>
			</vab-query-form-left-panel>
			<vab-query-form-right-panel>
				<el-form
					ref="form"
					:model="queryForm"
					:inline="true"
					@submit.native.prevent
				>
					<el-form-item>
						<el-input v-model="queryForm.name" placeholder="文件名" />
					</el-form-item>
					<el-form-item>
						<el-button
							icon="el-icon-search"
							type="primary"
							native-type="submit"
							@click="loadTable"
						>
							查询
						</el-button>
					</el-form-item>
				</el-form>
			</vab-query-form-right-panel>
		</vab-query-form>

		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="index" width="50"></el-table-column>
			<el-table-column prop="name" label="名称"></el-table-column>
			<el-table-column prop="size" label="大小"></el-table-column>
			<el-table-column prop="lastUpdateTime" label="更新时间"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
						@click="openDetailsDialog(scope.row)"
						type="text"
						size="small"
					>
						详情
					</el-button>
					<el-dropdown class="el-button el-button--text el-button--small">
						<span class="el-dropdown-link">
							更多
							<i class="el-icon-arrow-down"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>标签</el-dropdown-item>
							<el-dropdown-item>删除</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>

		<details-drawer ref="detailsDrawer"></details-drawer>
	</div>
</template>

<script>
import DetailsDrawer from './components/DetailsDrawer'
import { getObjectList } from '@/api/object'

export default {
	name: 'Object',
	components: {
		DetailsDrawer,
	},
	data() {
		return {
			queryForm: {},
			tableData: [],
		}
	},
	created() {
		this.loadTable()
	},
	methods: {
		loadTable() {
			this.$router.onReady(() => {
				getObjectList(this.$route.params).then((res) => {
					this.tableData = res.data
				})
			})
		},
		openDetailsDialog(row) {
			this.$refs.detailsDrawer.show(row)
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