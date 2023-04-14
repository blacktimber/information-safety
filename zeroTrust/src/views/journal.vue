<template>
	<tableInfo :keyss="keyss"  :tableList="tableList" @CurrentChange="CurrentChange"  :keywordsList="keywordsList"
	:queryInfo="queryInfo" :total="total" />
</template>

<script setup>
	import tableInfo from '../components/table.vue'
	import {ref,onMounted,getCurrentInstance,reactive} from 'vue'
	const {proxy} = getCurrentInstance()
	// 表格属性
	const queryInfo = ref({
	  currentPage: 1,
	  pageSize: 10,
	})
	// 列表总数量
	const total=ref(0)
	// 切换页码
	const CurrentChange=(val)=>{
		queryInfo.value.currentPage= val
	}
	// 列表数据key值
	const keyss=ref(["date","lavel","marks"])
	const tableList=ref([
		{title:"处理日期"},
		{title:"处理方式"},
		{title:"处理理由"},
	])
	// 列表数据
	const keywordsList=reactive([
		{date:"2023.4.13 12:10:20",lavel:"忽略",marks:"误操作"},
		{date:"2023.4.12 12:10:20",lavel:"报警",marks:"漏洞"}
	])
</script>

<style scoped lang="scss">
</style>