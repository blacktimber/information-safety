<template>
	<div class="top"></div>
	<tableInfo :keyss="keyss"  :tableList="tableList" @CurrentChange="CurrentChange"  :keywordsList="keywordsList"
	:queryInfo="queryInfo" :total="total" label='忽略' @callJournal="callJournal" :isFlag="false"/>
	
</template>

<script setup>
	import tableInfo from '../components/table.vue'
	// import MyDialog from '../components/dialog.vue'/
	import {ref,onMounted,getCurrentInstance,reactive} from 'vue'
	const {proxy} = getCurrentInstance()
	onMounted(()=>{
		getCallPolice()
	})
	
	const queryInfo = ref({
	  currentPage: 1,
	  pageSize: 10,
	})
	// 列表总数量
	const total=ref(0)
	// 切换页码
	const CurrentChange=(val)=>{
		queryInfo.value.currentPage= val
		getCallPolice()
	}
	// 列表数据key值
	const keyss=ref(["warDate","warIp"])
	const tableList=ref([
		{title:"时间"},
		{title:"IP"},
	])
	// 列表数据
	const keywordsList=ref([])
	// 获取报警信息
	const getCallPolice=async ()=>{
		const {data: res} = await proxy.$http.police.getPolice()
		if (res.code !== 200) return proxy.$message.error('获取数据失败')
		keywordsList.value=res.data
	}
	// 处理按钮
	const callJournal=async (form)=>{
		const item = {
			item:form.warId
		}
		const {data: res} = await proxy.$http.police.deletePolice(item)
		getCallPolice()
	}
	
</script>

<style scoped lang="scss">
	.el-form{
		--el-form-label-font-size: 0.2rem;
		.el-form-item__label{
			color: var(--el-text-color-regular) !important;
		}
		
	}
	.el-input{
		width: 3rem;
		--el-input-focus-border-color:#000;
		--el-input-border-radius:4px;
	}
	.el-textarea{
		width: 3rem;
		--el-input-focus-border-color:#000;
		
	}
	:deep.el-radio {
		width: 40%;
		height: 0.6rem;
		margin-right: 0.08rem;
		margin-left: 0.08rem;
		margin-top: -0.1rem;
		.el-radio__label {
			color: #000 !important;
			font-size: 0.20rem;
		}
		.el-radio__input {
			margin-bottom: 0.0125rem;
	
			.el-radio__inner {
				width: 0.2rem;
				height: 0.2rem;
				background-color: #fff;
				// border-color: #000;
				border: 0.03rem solid #000;
			}
	
			&.is-checked {
				.el-radio__inner {
					width: 0.2rem;
					height: 0.2rem;
					background-color: #000;
					border-color: #000;
				}
			}
	
			.el-radio__inner::after {
				width: 0.1rem;
				height: 0.1rem;
				border: 0.03rem solid #fff;
				background-color: #000;
			}
		}
	
	}
	.top {
		height: 0.6rem;
	}
</style>