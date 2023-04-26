<template>
	<div>
		<div class="top" >
			<span>目前开启引擎数量：{{total}}个</span>
			  <!-- <el-button @click="addNum">修改数量</el-button> -->
		</div>
		<tableInfo v-if="status" @CurrentChange="CurrentChange" :keyss="keyss" :tableList="tableList" 
		:keywordsList="keywordsList1" :queryInfo="queryInfo"  :label="label"/>
		<el-dialog
		  title="修改引擎数量"
		  :model-value="dialogVisibleAdd"
		  :close-on-click-modal="false"
		  width="30%"
		  @close="closeAdd"
		>
		<div class="dialogspan" >
			<span>引擎数量：</span>
			<el-input v-model="EngineNum"></el-input>
		</div>
		<div class="item_button">
		  <span class="dialog-footer">
		    <el-button @click="dialogVisibleAdd = false">取 消</el-button>
		    <el-button type="primary" @click="toChangeOdata">确 定</el-button>
		  </span>
		</div>
		</el-dialog>
	</div>
</template>

<script setup>
	import tableInfo from '@/components/table.vue'
	import {ref,onMounted,getCurrentInstance,reactive} from 'vue'
	const { proxy } = getCurrentInstance();
	const dialogVisibleAdd = ref(false);
	const tableList=ref([
		{title:"引擎名"},
		{title:"状态"},
	])
	const labels=[
		"1","2","3","4","5"
	]
	const queryInfo = reactive({
	  currentPage: 1,
	})
	const keyss=ref([
		"yyfFacility","isCheck"
	])
	const label=ref("状态")
	const EngineNum=ref("")
	const keywordsList1=ref([])
	const total = ref(0)
	const addNum=()=>{
		 dialogVisibleAdd.value=true
	}
	const closeAdd=()=>{
		 dialogVisibleAdd.value=false
	}
	const toChangeOdata=async()=>{
		// console.log(EngineNum.value);
		const num=EngineNum.value
		const queryind={
			coreSize:num,
			maximumSize:20
		}
		const {data:res} = await proxy.$http.Status.EditAllWords(queryind)
		if (res.code !== 200) return proxy.$message.error('修改引擎数量失败')
		console.log(res);
		dialogVisibleAdd.value = false
		getKeywordsList()
	}
	const status=ref(false)
	onMounted(() => {
		status.value=true
	  getKeywordsList();
	});
	// 获取信息列表
	const getKeywordsList = async () => {
	  const {data: res} = await proxy.$http.Status.getAllWords({item:'毓赢网络'})
	  if (res.code !== 200) return proxy.$message.error('获取引擎失败')
	  keywordsList1.value.length = 0
	  for(let i=0 ;i<res.data.length;i++) {
		  const datalll=res.data[i]
		const list={
			yyfFacility:Object.keys(datalll),
			isCheck:Object.values(datalll)
		}
		keywordsList1.value.push(list)
	  }
	  total.value = res.data.length
	}
	const CurrentChange=(val)=>{
		// queryInfo.currentPage= val
		getKeywordsList()
	}
</script>
<style  scoped lang="scss">
	  .top {
	    position: relative;
	    width: 100%;
	    height: 50px;
	    box-sizing: border-box;
	    margin: 20px 0;
		span{
			position: absolute;
			right: 1.4rem;
			top: 0.06rem;
			font-size: 0.20rem;
			color: black;
			font-weight: 500;
		}
	    .el-button {
	      position: absolute;
	      right: 0.4rem;
	      background-color: rgb(18, 16, 29);
	      color: white;
	      font-size: 0.15rem;
	      height: 35px;
	      border: none;
	  	border-radius: 0.055rem;
	    }
	  
	    .el-button:hover {
	      background-color: white;
	      color: rgb(18, 16, 29);
	      border: 1px solid black;
	    }
	  }
	  .item_button {
	    margin-top: 0.9rem;
	  
	    .dialog-footer {
	      display: flex;
	      width: 100%;
	      justify-content: center;
	  
	      .el-button {
	        background-color: rgb(18, 16, 29);
	        color: white;
	        font-size: 0.15rem;
	        height: 35px;
	        width: 1rem;
	        border: none;
	        box-sizing: border-box;
			border-radius: 0.055rem;
	        margin: 0 0.5rem;
	      }
	  
	      .el-button:hover {
	        background-color: white;
	        color: rgb(18, 16, 29);
	        border: 1px solid black;
	      }
	    }
	  }
	  .dialogspan{
		  font-size: 0.20rem;
		  color: black;
		  font-weight: 500;
		  .el-input{
			  width: 50%;
		  }
	  }
</style>