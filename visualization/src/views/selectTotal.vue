<template>
  <div>
	  <div class="title">策略运行结果</div>
	  <tableInfo :keyss="keyss"  :tableList="tableList" @CurrentChange="CurrentChange"  :keywordsList="keywordsList" 
	  :queryInfo="queryInfo" :total="total" />
</div>
</template>

<script setup>
	import tableInfo from '@/components/table.vue'
	import {useRoute} from "vue-router";
	import {ref,onMounted,getCurrentInstance,reactive} from 'vue'
	const route = useRoute()
	const {proxy} = getCurrentInstance()
	const queryInfo = ref({
	  currentPage: 1,
	  pageSize: 10,
	})
	
	const total=ref(0)
	
	onMounted(() => {
	  aliveSelect();
	});
	const CurrentChange=(val)=>{
		queryInfo.value.currentPage= val
		aliveSelect()
	}
	const keyss=ref([])
	const tableList=ref([
		{title:"ip地址"},
		{title:"日志等级"},
		{title:"设备名称"},
		{title:"日志信息"},
		{title:"生成时间"},
		{title:"记录时间"}
	])
	const keywordsList=reactive([])
	// const getSelect=async()=>{
	// 	const {data: res2} = await proxy.$http.Odata.getlogtable({item:queryInfoData.value.name})
	// 	if (res2.code !== 200) return proxy.$message.error('获取数据失败')
	// 
	// }
	const aliveSelect=async()=>{
		let params =JSON.parse(proxy.$method.read.decode(route.query.info)) 
		
		const {data: res} = await proxy.$http.Exhibition.getOPrg({...params,...queryInfo.value})
		// if (res.code !== 200) return proxy.$message.error('获取数据失败')
		// getSelect()
		console.log(res);
		keywordsList.length = 0
			for (let i = 0; i < res.data.records.length; i++) {
				keywordsList.push(res.data.records[i])
			}
			keyss.value=[]
			for (let key in keywordsList[0]) {
				keyss.value.push(key)
			}
			keyss.value=keyss.value.slice(1)
			total.value=res.data.total
	}
	
	
</script>

<style scoped>
	.title {
	  font-weight: bolder;
	  font-size: 0.4rem;
	  background-color: rgb(18,15,29);
	  color: white;
	  padding: 10px 0;
	}
</style>
