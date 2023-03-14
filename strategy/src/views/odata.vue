<template>
	<div>
		<div class="top" >
			  <el-button @click="addSource">添加</el-button>
		</div>
		<dataSource :labels="labels" @handleClick='handleClick'>
				<template #yyfName>
					<tableInfo :keyss="keyss" @CurrentChange="CurrentChange" @updateKeywords="updateKeywords"
					 @deleteKeywords="deleteKeywords" :tableList="tableList" 
					 :keywordsList="keywordsList" :queryInfo="queryInfo" 
					 :total="total"  :label="label" @gowords="gowords"/>
				</template>
		</dataSource>
		<StrDialog v-if="dialogVisibleAdd" :res="res" title="添加策略" @AddReg="AddReg" :dialogVisible="dialogVisibleAdd"  @changdialogVisible="changdialogVisible"/>
		<StrDialog v-if="dialogVisibleEdit" :res="res"  @AddReg="EditReg" :StrName="StrName" title="修改策略" :dialogVisible="dialogVisibleEdit"  @changdialogVisible="changdialogVisible"/>
		<el-dialog
		  title="删除策略"
		  :model-value="dialogVisibleDelete"
		  :close-on-click-modal="false"
		  width="30%"
		  @close="changdialogVisible"
		  style="border-radius: 10px;"
		>
		<span class="dialogspan" >
			<el-icon class="disIcon" :size="30" color="#922221">
			  <WarningFilled />
			</el-icon>
			此操作将永久删除该信息，是否继续？</span>
			
		<div class="item_button">
		  <span class="dialog-footer">
		    <el-button @click="cancelDelete">取 消</el-button>
		    <el-button type="primary" @click="DeleteOdata">确 定</el-button>
		  </span>
		</div>
		</el-dialog>
	</div>
</template>

<script setup>
	import {WarningFilled} from '@element-plus/icons-vue'
	import dataSource from '@/components/dataSource.vue'
	import tableInfo from '@/components/table.vue'
	import StrDialog from '@/components/StrDialog.vue'
	import {useRouter} from "vue-router";
	import {ref,getCurrentInstance,reactive,onMounted} from 'vue'
	const router = useRouter()
	const {proxy} = getCurrentInstance()
	const labels=reactive([])
	const queryInfoIp = reactive({
	})
	const queryInfo = reactive({
	  currentPage: 1,
	  pageSize: 5,
	})
	const total = ref(0)
	onMounted(() => {
	  getAllOdataName();
	});
	const getAllOdataName = async () => {
	  const {data: res} = await proxy.$http.Odata.getLabels()
	  if (res.code !== 200) return proxy.$message.error('获取数据源列表失败')
	  labels.length = 0
	  for (let i = 0; i < res.data.length; i++) {
	    labels.push(res.data[i])
	  }
	  queryInfoIp.facility = labels[0].yyfFacility
	  queryInfoIp.host = labels[0].yyfHost
	  getKeywordsList()
	}
	// 获取策略列表
	const getKeywordsList = async () => {
	  // console.log({...queryInfoIp, ...queryInfo})
	  const {data: res} = await proxy.$http.Odata.getLog({...queryInfoIp, ...queryInfo})
	  if (res.code !== 200) return proxy.$message.error('获取策略列表失败')
	  // console.log(res.data.records)
	  keywordsList.length = 0
	  // console.log(res.data);
	  for(let i=0;i<res.data.records.length;i++){
		  keywordsList.push(res.data.records[i])
	  }
	  total.value = res.data.total
	}
	// tabs切换
	const handleClick = tab => {
	  for (let i = 0; i < labels.length; i++) {
	    if (tab.props.label === labels[i].yyfName) {
	      queryInfoIp.facility = labels[i].yyfFacility
	      queryInfoIp.host = labels[i].yyfHost
	    }
	  }
	  getKeywordsList()
	}
	const CurrentChange=(val)=>{
		queryInfo.currentPage= val
		getKeywordsList()
	}
	const keyss=ref([
		"remark","strategy"
	])
	const tableList=ref([
		{title:"策略名"},
		{title:"策略详情"},
	])
	const keywordsList=reactive([])
	const label = ref("操作")
	const dialogVisibleAdd = ref(false);
	
	// 添加按钮打开对话框
	const addSource=()=>{
		res.value=[]
		dialogVisibleAdd.value=true
	}
	// 确定添加按钮
	const AddReg= async (name,sqlStr)=>{
		// const sqls=ref("")
		console.log(sqlStr);
		const queryAdd={
			remark:name.value,
			strategy:sqlStr
		}
		const {data: res} = await proxy.$http.Odata.addLog({...queryInfoIp, ...queryAdd})
		if (res.code !== 200) return proxy.$message.error('添加失败')
		dialogVisibleAdd.value=false
		getKeywordsList()
	}
	
	// 删除，修改，添加功能取消功能关闭对话框
	const changdialogVisible=()=>{
		dialogVisibleAdd.value=false
		dialogVisibleDelete.value=false
		dialogVisibleEdit.value=false
	}
	const dialogVisibleEdit = ref(false);
	const dialogVisibleDelete = ref(false);
	const deleteId=ref(0)
	const editId=ref("")
	// 删除按钮打开对话框
	const deleteKeywords=(index)=>{
		deleteId.value=index
		dialogVisibleDelete.value=true
	}
	const StrName = ref("")
	const updateId = ref(0)
	const res = ref([])
	// 打开修改按钮
	const updateKeywords=(items)=>{
		// console.log(form);
		res.value=[]
		updateId.value=items.id
		StrName.value=items.remark
		const arr = items.strategy.split(" ")
		for (let i = 0; i < arr.length; i++) {
			if(arr[i].indexOf('%')>0){
				let str=arr[i].replace('%','')
				 str=str.replace('%','')
				 str=str.replace(`'`,'')
				 str=str.replace(`'`,'')
				 arr[i-1]=arr[i-1]+" "+arr[i].replace(str,'*')
				 arr[i]=str
			}
		}
		const len = arr.length  //len为数组的长度
		const n = 4 // 假设每行显示4个
		const Num = len % 4 === 0 ? len / 4 : Math.floor((len / 4) + 1)  //得出多少份
		 //定义数组接受最终的数据
		for (let i = 0; i < Num; i++) {
		  // slice() 方法返回一个从开始到结束（不包括结束）的数组。且原始数组不会被修改。
		  const newArr = arr.slice(i * n, i * n + n) //得到每份的数据
		  res.value.push(newArr) //往res数组里加数据
		}
		dialogVisibleEdit.value=true
	}
	// 修改确定按钮
	const EditReg=async(name,sqlStr)=>{
		console.log(sqlStr);
		const queryAdd={
			id:updateId.value,
			remark:name.value,
			strategy:sqlStr
		}
		const {data: res} = await proxy.$http.Odata.getLogChange(queryAdd)
		if (res.code !== 200) return proxy.$message.error('修改失败')
		dialogVisibleEdit.value=false
		getKeywordsList()
		res.value=[]
	}
	// 确认删除
	const DeleteOdata= async () =>{
		    const {data: res} = await proxy.$http.Odata.deleteLog({item: deleteId.value})
			console.log({item: deleteId});
		    if (res.code !== 200) return proxy.$message.error('删除失败')
			dialogVisibleDelete.value=false
		    getKeywordsList()
		    return proxy.$message.success('删除成功')
	}
	//取消删除
	const cancelDelete=()=>{
		dialogVisibleDelete.value=false
		proxy.$message({
		  type: 'info',
		  message: '取消删除',
		})
	}
	// 运行图标gowords
	const gowords= async (item) =>{
		console.log(item);
		console.log(item.strategy);
		const cc=item.strategy
		    const {data: res} = await proxy.$http.Odata.selectTotal({sql: cc})
		    if (res.code !== 200) return proxy.$message.error('运行策略失败')
			console.log(res);
			const name=item.remark
			const sqls=item.strategy
			const toal=res.data
		const go = router.resolve({
		  path: '/selectTotal',
		  query: {name,sqls,toal}
		})
		window.open(go.href, '_blank')
			// dialogVisibleDelete.value=false
		 //    getKeywordsList()
		 //    return proxy.$message.success('删除分类词汇成功')
	}
</script>
<style  scoped lang="scss">
	  .top {
	    position: relative;
	    width: 100%;
	    height: 50px;
	    box-sizing: border-box;
	    margin: 20px 0;
	  
	    .el-button {
	      position: absolute;
	      right: 0.4rem;
	      background-color: rgb(18, 16, 29);
	      color: white;
	      font-size: 0.15rem;
	      height: 35px;
	      border: none;
	  	border-radius: 20%;
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
			  position: relative;
	  		  font-weight: 500;
			  .disIcon{
				  position: absolute;
				  left: -30px;
				      top: -5px;
			  }
	  }
</style>