<template>
	<el-dialog
	  :model-value="isFlag"
	  :close-on-click-modal="false"
	  width="30%"
	  class="deleteDialog"
	  @close="cancel"
	  style="border-radius: 10px;"
	>
	<template #header>
		<span style="font-size: 0.3rem; color: #000;">{{title}}</span>
	</template>
	<div class="slot">
		<slot>
			
		</slot>
	</div>
	<div class="item_button">
	  <span class="dialog-footer">
	    <el-button @click="cancel">取 消</el-button>
	    <el-button type="primary" @click="determine">确 定</el-button>
	  </span>
	</div>
	</el-dialog>
</template>

<script setup>
	import {ref, toRefs, defineProps,defineEmits } from 'vue'
	const props = defineProps({
	  //子组件接收父组件传递过来的值
	  title: String,
	  isFlag:Boolean
	})
	//使用父组件传递过来的值
	const {title,isFlag} =toRefs(props)
	const emit = defineEmits(['determine',"cancel"])
	// 取消按钮
	const cancel=()=>{
		emit('cancel')
	}
	// 修改按钮
	const determine=()=>{
		emit('determine')
	}
	
</script>

<style scoped lang="scss">
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
	
	.slot{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>