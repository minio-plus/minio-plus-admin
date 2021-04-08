<template>
	<div class="table-container">
		<vab-query-form>
			<vab-query-form-left-panel>
				<el-button type="primary" @click="openEdit">
					创建
					<i class="el-icon-coin el-icon--right"></i>
				</el-button>
			</vab-query-form-left-panel>
			<vab-query-form-right-panel></vab-query-form-right-panel>
		</vab-query-form>

		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="date" label="日期" width="180"></el-table-column>
			<el-table-column prop="name" label="姓名" width="180"></el-table-column>
			<el-table-column prop="address" label="地址"></el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
    data(){
        return {
            tableData: []
        }
    },
    created(){

    },
    methods: {

    }
}
</script>