<template>
		<div class="showlist">
			<div class="showbox" v-for="(item,index) in optionEcharts" :key="index">
				<div class="ech_show">
					<echartsStep :option="item" />
				</div>
				<div class="name">
					<span>{{name[index]}}</span>
				</div>
			</div>
		</div>
</template>

<script setup>
	import echartsStep from '@/components/echartsStep.vue'
	import {ref,getCurrentInstance,onMounted	} from 'vue'
	import { useStore } from 'vuex' // 引入useStore 方法
	const {proxy} = getCurrentInstance()
	const store = useStore()  // 该方法用于返回store 实例
	const optionEcharts = store.state.optionEcharts
	onMounted(() => {
		
	  // getData();
	});
	
	const name = ref([
		"基础折线图","基础柱形图", "基础饼图","基础面积图" ,"横向柱状图","环形图"
	])
	const getData= async ()=>{
		const {data: res} = await proxy.$http.Exhibition.getList()
		if (res.code !== 200) return proxy.$message.error('获取数据库字段失败')
		// console.log(res.data[0].fac);
		const queryInfo={
			facility:"daemon",
			host:"192.168.88.223"
		}
		const queryInIp={
			currentPage:1,
			facility:"",
			host:"",
			level:"NOTICE",
			pageSize:10
		}
		const {data: res2} = await proxy.$http.Exhibition.getData(queryInfo)
		if (res2.code !== 200) return proxy.$message.error('获取数据库字段失败')
		const {data: res3} = await proxy.$http.Exhibition.getOPrg(queryInIp)
		if (res3.code !== 200) return proxy.$message.error('获取数据库失败')
		console.log(res3);
	}
</script>

<style scoped lang="scss">
		.showlist {
			margin-top: 0.3rem;
			height: 90%;
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			justify-content: flex-start;

			.showbox {
				width: 35%;
				height: 3.8rem;
				margin-bottom: 0.8rem;
				margin-left: 1.5rem;
				font-size: 0.26rem;

				.name {
					margin-top: 0.10rem;
					justify-content: center;
					align-items: center;
				}

				.ech_show {
					height: 100%;
					width: 100%;
					border: 1px solid #ccc;
				}
			}
		}
</style>
