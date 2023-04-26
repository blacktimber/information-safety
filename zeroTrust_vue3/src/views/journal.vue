<template>
	<div class="top"><div>设备源</div></div>
	<dataSource :labels="labelsList" @handleClick='handleClick'>
			<template #>
				<tableInfo :keyss="keyss"  :tableList="tableList" @CurrentChange="CurrentChange"  :keywordsList="keywordsList"
				:queryInfo="queryInfo" :total="total" />
			</template>
	</dataSource>
	
</template>

<script setup>
	import dataSource from '../components/Scrollbar.vue'
	import tableInfo from '../components/table.vue'
	import {ref,onMounted,getCurrentInstance,reactive} from 'vue'
	const {proxy} = getCurrentInstance()
	// 表格属性
	const queryInfo = ref({
	  currentPage: 1,
	})
	// 列表总数量
	const total=ref(0)
	// 切换页码
	const CurrentChange=(val)=>{
		queryInfo.value.currentPage= val
		 getLogList()
	}
	// 列表数据key值
	const keyss=ref(["logDate","yysLevel","yysMsg"])
	const tableList=ref([
		{title:"处理时间"},
		{title:"警告等级"},
		{title:"日志信息"},
	])
	// 列表数据
	const keywordsList=ref([])
	onMounted(()=>{
		getIP()
		
	})
	const queryInfoIp=ref({})
	const handleClick = tab => {
	      queryInfoIp.value.host = labelsList.value[tab].yyfHost
	  getLogList()
	}
	const labelsList=ref([])
	// 获取日志信息表
	const getLogList=async ()=>{
		keywordsList.value=[]
		const sss={
			alarmIp:queryInfoIp.value.host,
			currentPage:queryInfo.value.currentPage
		}
		const {data: res} = await proxy.$http.journal.getIpLog(sss)
		if (res.code !== 200) return proxy.$message.error('获取数据失败')
		
		for(let i= 0 ;i<res.data.records.length;i++){
			keywordsList.value.push(res.data.records[i])
		}
	}
	// 获取左侧ip信息
	const getIP=async ()=>{
		const {data: res} = await proxy.$http.journal.getIp()
		if (res.code !== 200) return proxy.$message.error('获取数据失败')
		for(let i= 0 ;i<res.data.length;i++){
			labelsList.value.push(res.data[i])
		}
		queryInfoIp.value.host = labelsList.value[0].yyfHost
		getLogList()
	}
</script>

<style scoped lang="scss">
	.top {
		  width: 100%;
		  box-sizing: border-box;
		height: 1rem;
		font-size: 0.4rem;
		text-align: left;
		padding: 0.2rem;
	}
</style>