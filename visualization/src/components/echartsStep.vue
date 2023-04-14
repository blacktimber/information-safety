<template>
	<div ref="ech" class="echarts">
	</div>
</template>

<script setup>
	import {
		ref,
		getCurrentInstance,
		onMounted,
		defineProps,
		toRefs,
		defineEmits
	} from 'vue'
	const props = defineProps({
		//子组件接收父组件传递过来的值
		option:Object
	})
	//使用父组件传递过来的值
	const {
		option
	} = toRefs(props)
	const {
		proxy
	} = getCurrentInstance()
	// 基本柱形图
	const ech = ref(null);
	onMounted(() => {
		// console.log(option);
		if(option.value!=undefined){
			changeBar();
		}
		
	});
	const emit = defineEmits(['echartClick'])
	const echartClick=(params)=>{
		emit('echartClick',params)
	}
	const changeBar = () => {
		const myEChart = proxy.$echarts.init(ech.value);
		myEChart.setOption(option.value);
		// // // 根据页面大小自动响应图表大小
		window.addEventListener("resize", function() {
			myEChart.resize();
		});
		myEChart.on('click', function(params) {
		  // 控制台打印数据的名称
		  // console.log(params.name);
		  echartClick(params.name)
		});
	}
</script>

<style scoped lang="scss">
	.echarts{
		width:100%;
		height: 100%;
	}
</style>
