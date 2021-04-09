<template>
	<div class="table-container">
		<vab-query-form>
			<vab-query-form-left-panel>
				<el-button type="primary" @click="openUploadDialog">
					上传
					<i class="el-icon-upload el-icon--right"></i>
				</el-button>
				<el-button type="primary" @click="openFolderEdit">
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
						<el-select v-model="queryForm.bucketName" placeholder="请选择" @change="loadTable">
							<el-option
								v-for="item in bucketList"
								:key="item.name"
								:label="item.name"
								:value="item.name"
							></el-option>
						</el-select>
					</el-form-item>

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

		<el-table :data="tableData" v-loading="tableLoading" style="width: 100%">
			<el-table-column type="index" width="50"></el-table-column>
			<el-table-column label="名称">
				<template slot-scope="scope">
					<el-button
						type="text"
						icon="el-icon-folder"
						v-if="scope.row.dir === true"
					>
						{{ scope.row.objectName }}
					</el-button>
					<el-button
						type="text"
						icon="el-icon-picture"
						v-if="scope.row.dir === false"
					>
						{{ scope.row.objectName }}
					</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="size" label="大小"></el-table-column>
			<el-table-column label="存储类">
				<template slot-scope="scope">
					{{ scope.row.storageClass == 'STANDARD' ? '标准' : '' }}
				</template>
			</el-table-column>
			<el-table-column prop="lastModified" label="更新时间"></el-table-column>

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
		<upload-dialog ref="uploadDialog"></upload-dialog>
		<folder-edit ref="folderEdit" @success="loadTable"></folder-edit>
	</div>
</template>

<script>
import { DetailsDrawer, UploadDialog, FolderEdit } from './components'
import { getBucketList } from '@/api/bucket'
import { getObjectList } from '@/api/object'

export default {
	name: 'Object',
	components: {
		DetailsDrawer,
		UploadDialog,
		FolderEdit,
	},
	data() {
		return {
			queryForm: {
				bucketName: '',
			},
			tableLoading: false,
			tableData: [],
			bucketList: [],
		}
	},
	created() {
		this.$router.onReady(() => {
			// 获取桶列表
			getBucketList().then((res) => {
				this.bucketList = res.data

				if (!this.$route.params.bucketName) {
					this.queryForm.bucketName = this.bucketList[0].name
				} else {
					this.queryForm.bucketName = this.$route.params.bucketName
				}
				this.loadTable()
			})
		})
		
	},
	mounted() {},
	methods: {
		loadTable() {
			this.tableLoading = true;
			getObjectList(this.queryForm).then((res) => {
				this.tableData = res.data
				this.tableLoading = false;
			})
		},
		openDetailsDialog(row) {
			row.bucketName = this.queryForm.bucketName;
			this.$refs.detailsDrawer.show(row)
		},
		openUploadDialog() {
			this.$refs.uploadDialog.show({ bucketName: this.queryForm.bucketName })
		},
		openFolderEdit() {
			this.$refs.folderEdit.show({ bucketName: this.queryForm.bucketName })
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