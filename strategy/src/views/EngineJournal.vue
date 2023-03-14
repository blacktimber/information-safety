<template>
	<div class="top">
		<tableInfo v-if="status" @CurrentChange="CurrentChange" @download="download" :keyss="keyss" :tableList="tableList" 
		:keywordsList="keywordsList1" :queryInfo="queryInfo" :total="total" :label="label"/>
	</div>
</template>

<script setup>
	
	import tableInfo from '@/components/table.vue'
	import {ref,onMounted,getCurrentInstance,reactive} from 'vue'
	const { proxy } = getCurrentInstance();
	const tableList=ref([
		{title:"引擎名"},
	])
	const label=ref("下载")
	const keyss=ref([
		"yysFacility"
	])
	const status=ref(false)
	onMounted(() => {
		status.value=true
		gettotal()
	  getOdata(1);
	});
	const queryInfo = reactive({
	  currentPage: 1,
	  pageSize: 9,
	})
	const keywordsList1=ref([])
	// 获取信息列表
	const getOdata = async (val) => {
	  const  {data:res}  = await proxy.$http.Journal.getLog({currentPage:val});
	  if (res.code !== 200) return proxy.$message("获取数据源列表失败");
	  if (!res.data === false) {
	    keywordsList1.value.length = 0;
	    for (let i = 0; i < res.data.length; i++) {
			const list ={}
			list.yysFacility=res.data[i]
	      keywordsList1.value.push(list);
	    }
	  }
	  }
	  const CurrentChange=(val)=>{
		  // console.log(val);
		  queryInfo.currentPage=val
	  	getOdata(val)
	  }
	  const total = ref(0)
	  const gettotal=async()=>{
	  	const  {data:res}  = await proxy.$http.Journal.gettotal();
		total.value=res.data
		console.log(res);
	  }
		const download=async(val)=>{
			const  res  = await proxy.$http.Journal.downLog({logName:val});
			window.open(`${res.config.baseURL}${res.config.url}?logName=${res.config.params.logName}`,"_self")
		}
</script>
<style  scoped lang="scss">
	  .top{
		  margin-top: 90px;
	  }
</style>