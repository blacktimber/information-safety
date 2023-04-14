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
		<el-form
		    label-width="2rem"
		    :model="form"
			 :rules="rules"
			 ref="ruleFormRef"
		    style="max-width: 460px;margin-right: 1rem;width: 100%;"
		  >
		    <el-form-item label="名称" prop="name">
		      <el-input v-model="form.name" />
		    </el-form-item>
		    <el-form-item label="IP" prop="ip">
		      <el-input v-model="form.ip" />
		    </el-form-item>
		    <el-form-item label="联系人" prop="people">
		      <el-input v-model="form.people" />
		    </el-form-item>
			<el-form-item label="联系电话" prop="phone">
			  <el-input v-model="form.phone" />
			</el-form-item>
		  </el-form>
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
	import {reactive,ref, toRefs, defineProps,defineEmits } from 'vue'
	const props = defineProps({
	  //子组件接收父组件传递过来的值
	  title: {
	        type: String,
	        default: ''
	      },
	  isFlag: {
	        type: Boolean,
	        default: ''
		},
		formList: {
		      type: Object,
		      default: {}
		},
	})
	//使用父组件传递过来的值
	const {title,isFlag,formList} =toRefs(props)
	const form= ref({})
	if(formList.value){
		form.value=formList.value
	}else{
		form.value.name=""
		form.value.ip=""
		form.value.people=""
		form.value.phone=""
	}
	const emit = defineEmits(['determine',"cancel"])
	const ruleFormRef = ref(null)
	const ruleForm = reactive({
	  name: '',
	  ip: '',
	  people: '',
	  phone:''
	})
	const rules = reactive({
	  name: [
	    { required: true, message: '名称不能为空', trigger: 'blur' },
	  ],
	  ip: [
	    { required: true, message: 'ip不能为空', trigger: 'blur' },
		 {  message: 'ip格式不正确', trigger: 'blur', pattern:/(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/, },
	  ],
	  people: [
	    { required: true, message: '联系人不能为空', trigger: 'blur' },
	  ],
	  phone: [
	     { required: true, message: '联系电话不能为空', trigger: 'blur' } ,
		  {  message: '手机号格式不正确', trigger: 'blur', pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/, },
	  ],
	  })
	  const resetForm = (ruleFormRef) => {
	    if (!ruleFormRef) return
	    ruleFormRef.resetFields()
	  }
	  const submitForm = (formEl) => {
	    if (!formEl) return
	    formEl.validate((valid) => {
	      if (valid) {
	      } else {
	        return false
	      }
	    })
	  }
	// 取消按钮
	const cancel=()=>{
		resetForm(ruleFormRef.value)
		emit('cancel')
	}
	// 修改按钮
	const determine=()=>{
		submitForm(ruleFormRef.value)
		emit('determine',form.value)
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
		--el-input-border-radius:10px;
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
	
	.slot{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>