<template>
	<el-dialog :title="this.form.id ? '编辑' : '创建'" :visible.sync="dialogVisible" :before-close="handleClose">
		<el-form ref="form" :model="form" :rules="formRules" label-width="80px">
			<el-form-item label="状态" prop="status">
				<el-radio-group v-model="form.status">
					<el-radio label="Enabled" border>启用</el-radio>
					<el-radio label="Disabled" border>禁用</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="策略">
				<el-radio-group v-model="strategy">
					<el-radio :label="1" border>前缀+标签</el-radio>
					<el-radio :label="0" border>全局</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="前缀" v-if="strategy === 1" prop="prefix">
				<el-input v-model="form.prefix" placeholder="请输入内容"></el-input>
			</el-form-item>

			<el-form-item label="标签">
				<el-tag type="warning" closable :disable-transitions="false" @close="removeTag(key)" v-for="(val, key, index) in form.tags" :key="index">
					{{ key }} : {{ val }}
				</el-tag>

				<el-row class="input-map">
					<el-col :span="10">
						<el-input v-model="tag.key" placeholder="请输入键"></el-input>
					</el-col>
					<el-col :span="10">
						<el-input v-model="tag.value" placeholder="请输入值"></el-input>
					</el-col>
					<el-col :span="4">
						<el-button @click="addTag">添加</el-button>
					</el-col>
				</el-row>
			</el-form-item>

			<el-form-item label="过期策略">
				<el-radio-group v-model="form.cleanStrategy">
					<el-radio label="EXPIRATION_DAYS" border>过期天数</el-radio>
					<el-radio label="EXPIRATION_DATE" border>过期日期</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="删除文件" prop="days">
				<el-row>
					<el-col :span="1">
						<el-checkbox v-model="deleteObject" @change="deleteObjectChange"></el-checkbox>
					</el-col>
					<el-col :span="23">
						<el-input v-model="form.days" placeholder="请输入天数" v-if="form.cleanStrategy == 'EXPIRATION_DAYS'" :disabled="!deleteObject"></el-input>
						<el-date-picker v-model="form.date" type="date" placeholder="选择日期" v-if="form.cleanStrategy == 'EXPIRATION_DATE'" :disabled="!deleteObject"></el-date-picker>
					</el-col>
				</el-row>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="save">保 存</el-button>
		</span>
	</el-dialog>
</template>
<script>
import { creareBucketLifecycleRule } from '@/api/bucket'

export default {
	data() {
		var checkPrefix = (rule, value, callback) => {
			if (this.strategy === 1 && !value) {
				return callback(new Error('前缀不能为空'))
			}
			callback()
		}

		var checkDays = (rule, value, callback) => {
			if (this.form.cleanStrategy === 'EXPIRATION_DAYS' && !value) {
				return callback(new Error('天数不能为空'))
			}
			callback()
		}

		var checkDate = (rule, value, callback) => {
			if (this.form.cleanStrategy === 'EXPIRATION_DATE' && !value) {
				return callback(new Error('日期不能为空'))
			}
			callback()
		}

		return {
			dialogVisible: false,
			form: {
				bucketName: '',
				status: 'Enabled',
				prefix: '',
				tags: {},
				cleanStrategy: 'EXPIRATION_DAYS', // 清除策略
				days: '',
			},
			strategy: 1, // 策略
			deleteObject: false, // 删除对象
			// 标签
			tag: {
				key: '',
				value: '',
			},
			// 表单规则
			formRules: {
				prefix: [{ validator: checkPrefix, trigger: 'blur' }],
				days: [{ validator: checkDays, trigger: 'blur' }],
				date: [{ validator: checkDate, trigger: 'blur' }],
			},
		}
	},
	methods: {
		show(args) {
			if (args.id) {
				this.form = args
				if (this.form.days != null) {
					this.form.cleanStrategy = 'EXPIRATION_DAYS'
				} else {
					this.form.cleanStrategy = 'EXPIRATION_DATE'
				}
				this.deleteObject = true
			} else {
				this.form.bucketName = args.bucketName
			}
			this.dialogVisible = true
		},
		handleClose(done) {
			done()
		},
		addTag() {
			if (this.tag.key !== '' && this.tag.value !== '') {
				this.form.tags[this.tag.key] = this.tag.value
				this.tag = {
					key: '',
					value: '',
				}
			} else {
				this.$message({
					message: '请输入键值对',
					type: 'warning',
				})
			}
		},
		removeTag(key) {
			let newTags = Object.assign({}, this.form.tags)
			delete newTags[key]
			this.form.tags = newTags
		},
		deleteObjectChange(val) {
			if (val === false) {
				this.form.days = ''
			}
		},
		save() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					creareBucketLifecycleRule(this.form).then((res) => {
						this.dialogVisible = false
						this.$refs.form.resetFields()
						this.$emit('success')
					})
				} else {
					this.$message.error('未通过表单验证')
					return false
				}
			})
		},
	},
}
</script>

<style scoped>
</style>