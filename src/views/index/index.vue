<template>
	<div class="more-container">
		<el-card class="box-card">
			<el-row type="flex">
				<el-col :span="1">
					<el-avatar :size="50" :src="$store.getters['user/avatar']"></el-avatar>
				</el-col>
				<el-col :span="10">
					<div>
						<h2>下午好 {{ $store.getters['user/username'] }}，你一定有些累了，喝杯咖啡提提神。</h2>
					</div>
				</el-col>
			</el-row>
		</el-card>

		<el-row type="flex">
			<el-col :span="4">
				<el-card class="box-card">
					<div id="disk-liquid-container"></div>
				</el-card>
			</el-col>
			<el-col :span="4">

			</el-col>
		</el-row>
	</div>
</template>

<script>
import { Liquid, measureTextWidth } from '@antv/g2plot'

export default {
	name: 'More',
	components: {},
	data() {
		return { nodeEnv: process.env.NODE_ENV }
	},
	created() {
		console.log(this.$store.getters)
	},
	mounted() {
		this.loadDiskData()
	},
	methods: {
		loadDiskData() {
			const liquidPlot = new Liquid(
				document.getElementById('disk-liquid-container'),
				{
					percent: 0.26,
					radius: 0.8,
					statistic: {
						title: {
							formatter: () => '磁盘利用度',
							style: ({ percent }) => ({
								fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
							}),
						},
						content: {
							style: ({ percent }) => ({
								fontSize: 60,
								lineHeight: 1,
								fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
							}),
							customHtml: (container, view, { percent }) => {
								const { width, height } = container.getBoundingClientRect()
								const d = Math.sqrt(
									Math.pow(width / 2, 2) + Math.pow(height / 2, 2)
								)
								const text = `占比 ${(percent * 100).toFixed(0)}%`
								const textWidth = measureTextWidth(text, { fontSize: 60 })
								const scale = Math.min(d / textWidth, 1)
								return `<div style="width:${d}px;display:flex;align-items:center;justify-content:center;font-size:${scale}em;line-height:${
									scale <= 1 ? 1 : 'inherit'
								}">${text}</div>`
							},
						},
					},
					liquidStyle: ({ percent }) => {
						return {
							fill: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
							stroke: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
						}
					},
					color: () => '#5B8FF9',
				}
			)

			liquidPlot.render()
		},
	},
}
</script>
<style lang="scss" scoped>
.more-container {
	// ::v-deep {
	// 	.el-card__body {
	// 		> div {
	// 			min-height: 220px;
	// 			padding: 20px;

	// 			> ul {
	// 				> li {
	// 					line-height: 30px;
	// 				}
	// 			}

	// 			> img {
	// 				display: block;
	// 				margin: 40px auto;
	// 				border: 1px solid #dedede;
	// 			}
	// 		}
	// 	}
	// }
}
</style>
