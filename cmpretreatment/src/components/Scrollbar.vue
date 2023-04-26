<template>
	<div style="width: 100%;height: 100%;display: flex;">
		<el-scrollbar class="scro_left" :min-size="400">
			<div :class="{left_list_click:isFlag==index}" class="left_list" v-for="(item,index) in labels" 
			:key="index" @click="changClass(index)">
			{{item.yyfName}}
			</div>
		</el-scrollbar>
		<el-scrollbar :min-size="400" class="scro_right" >
			<slot></slot>
		</el-scrollbar>
	</div>
</template>

<script setup>
	import {ref,defineProps,toRefs,defineEmits} from "vue"
	const props = defineProps({
	  //子组件接收父组件传递过来的值
	  labels: {
	        type: Array,
	        default: ()=>[]
	      },
	})
	//使用父组件传递过来的值
	const {labels} =toRefs(props)
	const isFlag=ref(0)
	const emit = defineEmits(['handleClick'])
	const changClass=(index)=>{
		isFlag.value=index
		 emit('handleClick',index)
	}
</script>

<style scoped lang="scss">
	::v-deep .el-scrollbar__wrap{
		overflow: unset !important;
	}
	::v-deep .el-scrollbar{
		overflow: unset !important;
	}
	.scro_right{
		width: 80%;
		height: 100%;
		padding: 0 1rem;
		box-sizing: border-box;
	}
	.scro_right ::v-deep .el-scrollbar__wrap{
			overflow: auto !important;
	}
	.scro_left{
		width: 20%;
		height: 100%;
		box-sizing: border-box;
		 border-right: 0.0325rem solid #ccc;
		 
		.left_list{
			width: 100%;
			height: 0.6rem;
			line-height: 0.6rem;
			font-size: 0.20rem;
			color: #303133;
			font-weight: 400;
			box-sizing: border-box;
			text-align: right;
			padding-right: 10%;
		}
		.left_list_click{
			width: 101%;
			height: 0.8rem;
			line-height: 0.8rem;
			font-size: 0.4rem;
			color: #000;
			font-weight: 600;
			box-sizing: border-box;
			border-right: 0.0325rem solid #000;
			position: relative;
		}
	}
</style>
