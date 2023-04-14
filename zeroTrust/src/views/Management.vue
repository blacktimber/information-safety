<template>
	<div class="top"><el-button @click="addIP">添加</el-button></div>
	<tableInfo :keyss="keyss"  :tableList="tableList" @CurrentChange="CurrentChange"  :keywordsList="keywordsList"
	:queryInfo="queryInfo" :total="total" label="操作" @deleteKeywords="deleteKeywords" @updateKeywords="updateKeywords"/>
	
	<MyDialog title="删除设备源" :isFlag="dialogDelete" @determine="Deletedetermine" @cancel="Deletecancel">
		<template #>
			<img src="../assets/imgs/warning.png" alt="" class="dialogimg">
			<span class="dialogspan" >
				 
				此操作将永久删除该信息，是否继续？</span>
		</template>
	</MyDialog>
	<MyForm  title="添加设备源" :isFlag="dialogAdd" @determine="Adddetermine" @cancel="Addcancel"></MyForm>
	<MyForm v-if="dialogEdit"  title="修改设备源" :formList="formList" :isFlag="dialogEdit" @determine="Editdetermine" @cancel="Editcancel"></MyForm>
</template>

<script setup>
	import tableInfo from '../components/table.vue'
	import MyDialog from '../components/dialog.vue'
	import MyForm from '../components/form.vue'
	import {ref,onMounted,getCurrentInstance,reactive} from 'vue'
	const {proxy} = getCurrentInstance()
	// 删除按钮弹窗
	const dialogDelete=ref(false)
	// 添加按钮弹窗
	const dialogAdd=ref(false)
	// 修改按钮弹窗
	const dialogEdit=ref(false)
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
	const keyss=ref(["name","ip","people","phone"])
	const tableList=ref([
		{title:"名称"},
		{title:"ip"},
		{title:"联系人"},
		{title:"联系电话"},
	])
	// 列表数据
	const keywordsList=reactive([
		{name:"设备1",ip:"192.168.0.1",phone:"17505670612",people:"张三"},
		{name:"设备2",ip:"192.168.0.1",phone:"17505670612",people:"张三"}
	])
	// 添加设备源
	const addIP=()=>{
		dialogAdd.value=true
	}
	// 添加设备源取消按钮
	const Addcancel=()=>{
		dialogAdd.value=false
	}
	// 添加设备源确认按钮
	const Adddetermine=(form)=>{
		console.log(form);
		dialogAdd.value=false
	}
	const formList=ref({})
	// 修改设备源打开按钮
	const updateKeywords=(item)=>{
		formList.value={}
		formList.value=item
		dialogEdit.value=true
	}
	// 修改设备源取消按钮
	const Editcancel=()=>{
		dialogEdit.value=false
	}
	// 修改设备源确认按钮
	const Editdetermine=(form)=>{
		console.log(form);
		dialogEdit.value=false
	}
	// 删除设备源打开按钮
	const deleteKeywords=(item)=>{
		dialogDelete.value=true
		console.log("删除",item);
	}
	// 删除设备源取消按钮
	const Deletecancel=()=>{
		dialogDelete.value=false
	}
	// 删除设备源确认按钮
	const Deletedetermine=()=>{
		dialogDelete.value=false
	}
</script>

<style scoped lang="scss">
	.top {
	 float: right;
	 padding-right: 5%;
	 box-sizing: border-box;
	 margin-bottom: 0.2rem;
	  .el-button {
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
	.dialogspan{
			  font-size: 0.20rem;
			  color: black;
				  position: relative;
			  font-weight: 500;
	}
	.dialogimg{
			  width: 0.20rem;
	}
</style>