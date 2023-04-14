<template>
	<tableInfo :keyss="keyss"  :tableList="tableList" @CurrentChange="CurrentChange"  :keywordsList="keywordsList"
	:queryInfo="queryInfo" :total="total" label='处理' @callJournal="callJournal"/>
	<MyDialog title="风险处理" :isFlag="dialogCall" @determine="Celldetermine" @cancel="Cellecancel">
		<template #>
			<el-form
			    label-width="2rem"
			    :model="form"
			    style="max-width: 460px;margin-right: 1rem;width: 100%;"
			  >
			    <el-form-item label="处理方式" prop="name" style="margin-bottom: 0.5rem;">
			      <el-radio-group v-model="form.radio" text-color="#ffffff" fill="#ffffff" class="radio-group">
			      	<el-radio :label="1">报警</el-radio>
					<el-radio :label="2">忽略</el-radio>
			      </el-radio-group>
			    </el-form-item>
			    <el-form-item label="处理原因" prop="ip">
			      <el-input v-model="form.text" type="textarea"/>
			    </el-form-item>
			  </el-form>
		</template>
	</MyDialog>
</template>

<script setup>
	import tableInfo from '../components/table.vue'
	import MyDialog from '../components/dialog.vue'
	import {ref,onMounted,getCurrentInstance,reactive} from 'vue'
	const {proxy} = getCurrentInstance()
	// 处理按钮弹窗
	const dialogCall=ref(false)
	// 弹框信息存储
	const form=ref({})
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
		{title:"时间"},
		{title:"风险"},
		{title:"报警信息"},
	])
	// 列表数据
	const keywordsList=reactive([
		{date:"2023.4.13 12:10:20",lavel:"一级",marks:"误操作",id:"1"},
		{date:"2023.4.12 12:10:20",lavel:"二级",marks:"漏洞",id:"2"}
	])
	// 处理按钮
	const callJournal=(item)=>{
		console.log(item);
		dialogCall.value=true
	}
	// 处理弹框取消按钮
	const Cellecancel=()=>{
		dialogCall.value=false
	}
	//处理弹框确认按钮
	const Celldetermine=()=>{
		console.log(form.value);
		dialogCall.value=false
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
	
</style>