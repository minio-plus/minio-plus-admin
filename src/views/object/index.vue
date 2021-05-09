<template>
	<div class="table-container">
		<vab-query-form>
			<vab-query-form-left-panel>
				<el-button type="primary" @click="openFolderEdit">
					新建目录
					<i class="el-icon-folder-add el-icon--right"></i>
				</el-button>
				<el-button type="primary" @click="openMultipartUploadList">
					碎片管理
					<i class="el-icon-files el-icon--right"></i>
				</el-button>
			</vab-query-form-left-panel>
			<vab-query-form-right-panel>
				<el-form ref="form" :model="queryForm" :inline="true" @submit.native.prevent>
					<el-form-item>
						<el-select v-model="queryForm.bucketName" placeholder="请选择" @change="loadTable">
							<el-option v-for="item in bucketList" :key="item.name" :label="item.name" :value="item.name"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item>
						<el-input v-model="queryForm.name" placeholder="文件名" />
					</el-form-item>

					<el-form-item>
						<el-button icon="el-icon-search" type="primary" native-type="submit" @click="loadTable">
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
					<div v-if="scope.row.dir === true && scope.row.etag === 'A'">
						<el-button type="text" icon="el-icon-back" @click="nameClick(scope.row)"></el-button>

						<span>
							&nbsp;
							&nbsp;
							&nbsp;
							/{{ scope.row.objectName }}
						</span>
					</div>

					<el-button type="text" icon="el-icon-folder" v-if="scope.row.dir === true && scope.row.etag !== 'A'" @click="nameClick(scope.row)">
						{{ scope.row.objectName }}
					</el-button>
					<el-button type="text" :icon="getIconByName(scope.row.objectName)" v-if="scope.row.dir === false" @click="nameClick(scope.row)">
						{{ scope.row.objectName }}
					</el-button>
				</template>
			</el-table-column>
			<el-table-column label="大小">
				<template slot-scope="scope">
					{{ convertSizeText(scope.row.size) }}
				</template>
			</el-table-column>
			<el-table-column label="存储类">
				<template slot-scope="scope">
					{{ scope.row.storageClass == 'STANDARD' ? '标准' : '' }}
				</template>
			</el-table-column>
			<el-table-column prop="lastModified" label="更新时间"></el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope" v-if="scope.row.etag !== 'A'">
					<el-button @click="openDetailsDialog(scope.row)" type="text" size="small">
						详情
					</el-button>
					<el-dropdown class="el-button el-button--text el-button--small" @command="handleCommand">
						<span class="el-dropdown-link">
							更多
							<i class="el-icon-arrow-down"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>标签</el-dropdown-item>
							<el-dropdown-item :command="{ type: 'DELETE', data: scope.row }">删除</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>

		<details-drawer ref="detailsDrawer"></details-drawer>
		<folder-edit ref="folderEdit" @success="loadTable"></folder-edit>
		<multipart-upload-list ref="multipart-upload-list"></multipart-upload-list>
	</div>
</template>

<script>
import { DetailsDrawer, FolderEdit, MultipartUploadList } from './components'
import { getBucketList } from '@/api/bucket'
import { getObjectList, removeObject } from '@/api/object'

export default {
	name: 'Object',
	components: {
		DetailsDrawer,
		FolderEdit,
		MultipartUploadList
	},
	data() {
		return {
			queryForm: {
				bucketName: '',
				prefixs: [],
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
			this.tableLoading = true
			getObjectList(this.queryForm).then((res) => {
				this.tableData = res.data
				if (this.queryForm.prefixs.length > 0) {
					this.tableData.splice(0, 0, {
						etag: 'A',
						objectName: this.queryForm.prefixs[
							this.queryForm.prefixs.length - 1
						],
						lastModified: '',
						storageClass: '',
						size: 0,
						dir: true,
					})
				}
				
				this.$store.dispatch(
					'upload/load',
					this.queryForm.bucketName,
					this.queryForm.prefixs.join()
				)
				
				this.tableLoading = false
			})
		},
		openDetailsDialog(row) {
			row.bucketName = this.queryForm.bucketName
			this.$refs.detailsDrawer.show(row)
		},
		nameClick(data) {
			if (data.dir && data.etag !== 'A') {
				this.queryForm.prefixs.push(data.objectName)
				this.loadTable()
			} else if (data.dir && data.etag == 'A') {
				this.queryForm.prefixs.splice(this.queryForm.prefixs.length - 1, 1)
				this.loadTable()
			} else {
				this.openDetailsDialog(data)
			}
		},
		convertSizeText(size){
			let newSize;
			if(size >= 1073741824) {
				newSize = size / 1073741824
				return newSize.toFixed(2) + ' GB'
			} else if(size >= 1048576) {
				newSize = size / 1048576
				return newSize.toFixed(2) + ' MB'
			}else if(size >= 1024){
				newSize = size / 1024
				return newSize.toFixed(2) + ' kb'
			} else {
				return size;
			}
		},
		getIconByName(name) {
			let icon = '';
			switch(name.substring(name.lastIndexOf('.') + 1, name.length)){
				case 'jpg':
					icon = 'el-icon-picture'
					break;
				case 'png':
					icon = 'el-icon-picture'
					break;
				case 'mp4':
					icon = 'el-icon-s-platform'
					break;
				default:
					icon = 'el-icon-document'
					break;
			}
			return icon;
		},
		handleCommand(command) {
			switch (command.type) {
				case 'DELETE':
					this.removeRow(command.data)
					break
			}
		},
		removeRow(row) {
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					removeObject({
						bucketName: this.queryForm.bucketName,
						objectName: row.objectName,
					}).then((res) => {
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
		openFolderEdit() {
			this.$refs.folderEdit.show({
				prefixs: this.queryForm.prefixs,
				bucketName: this.queryForm.bucketName,
			})
		},
		openMultipartUploadList(){
			this.$refs['multipart-upload-list'].show({bucketName: this.queryForm.bucketName});
		}
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