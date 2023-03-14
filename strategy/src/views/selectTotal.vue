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
	  pageSize: null,
	})
	const queryInfoData = ref({
	  name: route.query.name,
	  sql: route.query.sqls
	})
	const total=ref(0)
	 total.value=parseInt(route.query.toal)
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
	const getSelect=async()=>{
		const {data: res2} = await proxy.$http.Odata.getlogtable({item:queryInfoData.value.name})
		if (res2.code !== 200) return proxy.$message.error('获取数据失败')
		console.log(res2.data);
		keywordsList.length = 0
		for (let i = 0; i < res2.data.length; i++) {
			keywordsList.push(res2.data[i])
		}
		keyss.value=[]
		for (let key in keywordsList[0]) {
			keyss.value.push(key)
		}
		keyss.value=keyss.value.slice(1)
	}
	const aliveSelect=async()=>{
		const {data: res1} = await proxy.$http.Odata.selectLog({...queryInfoData.value,...queryInfo.value})
		if (res1.code !== 200) return proxy.$message.error('缓存数据失败')
		getSelect()
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
