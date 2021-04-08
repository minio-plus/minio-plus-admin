<template>
	<div class="table-container">
		<vab-query-form>
			<vab-query-form-left-panel>
				<el-button type="primary" @click="openTableEdit">
					创建
					<i class="el-icon-coin el-icon--right"></i>
				</el-button>
			</vab-query-form-left-panel>
			<vab-query-form-right-panel></vab-query-form-right-panel>
		</vab-query-form>

		<el-table :data="tableData" style="width: 100%">
			<el-table-column label="策略">
				<template slot-scope="scope">
					<div v-if="scope.row.prefix !== null && scope.row.tags !== null">
						<div>前缀 + 标签</div>
						<div>前缀 {{ scope.row.prefix }}</div>
						<div>
							标签
							<el-tag
								type="warning"
								v-for="(val, key, index) in scope.row.tags"
								:key="index"
							>
								{{ key }} : {{ val }}
							</el-tag>
						</div>
					</div>
					<div v-else-if="scope.row.prefix !== null && scope.row.tags === null">
						<div>前缀匹配</div>
						<div>前缀 {{ scope.row.prefix }}</div>
					</div>
					<div v-else-if="scope.row.prefix === null && scope.row.tags !== null">
						<div>全局匹配</div>
						<el-tag
							type="warning"
							v-for="(val, key, index) in scope.row.tags"
							:key="index"
						>
							{{ key }} : {{ val }}
						</el-tag>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="规则">
				<template slot-scope="scope">
					<div v-if="scope.row.days !== null">
						删除对象 <el-tag>{{ scope.row.days }} 天</el-tag>
					</div>
					<div v-else-if="scope.row.date !== null">
						删除对象 {{ scope.row.date }}
					</div>
				</template>
			</el-table-column>
			<el-table-column label="状态">
				<template slot-scope="scope">
					{{ scope.row.status === 'Enabled' ? '启用' : '禁用' }}
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="text">编辑</el-button>
					<el-button type="text" @click="deleteRow(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<table-edit ref="tableEdit" @success="loadTable"></table-edit>
	</div>
</template>

<script>
import TableEdit from './components/TableEdit'
import { getBucketLifecycleRuleList, deleteBucketLifecycleRule } from '@/api/bucket'

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
			getBucketLifecycleRuleList({ bucketName: 'test' }).then((res) => {
				this.tableData = res.data
			})
		},
		openTableEdit() {
			this.$refs.tableEdit.show({ bucketName: 'test' })
		},
		deleteRow(row) {
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
                deleteBucketLifecycleRule({ bucketName: 'test', id: row.id }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '操作成功!',
                    })
                    this.loadTable()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                })
            })
    },
	},
}
</script>