<template>
	<div>
		<el-dialog
		  :title="title"
		  :model-value="dialogVisibleDelete"
		  :close-on-click-modal="false"
		  width="30%"
		  @close="cancel"
		  style="border-radius: 10px;"
		>
		<slot class="slot"></slot>
		<div class="item_button">
		  <span class="dialog-footer">
		    <el-button @click="cancel">取 消</el-button>
		    <el-button type="primary" @click="determine">确 定</el-button>
		  </span>
		</div>
		</el-dialog>
	</div>
</template>

<script setup>
	import { toRefs, defineProps,defineEmits } from 'vue'
	const props = defineProps({
	  //子组件接收父组件传递过来的值
	  dialogVisibleDelete: Boolean,
	  title:String
	})
	//使用父组件传递过来的值
	const {dialogVisibleDelete,title} =toRefs(props)
	const emit = defineEmits(['determine','cancel'])
	const determine=()=>{
		emit('determine',false)
	}
	const cancel=()=>{
		emit('cancel',false)
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
	/deep/.el-dialog__header{
		margin: 0;
		.el-dialog__title{
			font-size: 0.3rem;
		}
	}
</style>