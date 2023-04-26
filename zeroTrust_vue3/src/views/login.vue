<template>
	<div class="bgss">
		<div class="top_title">
		  <div class="top_title_content">
		    <div class="top_title_content_left">
		      <img src="../assets/imgs/logo.png" alt="logo">
		      <p>崇明区部门政务信息系统集成接入项目</p>
		    </div>
		    <div class="top_title_content_right">
		      <p>Welcome</p>
		    </div>
		  </div>
		</div>
		<el-card class="box-card" v-if="isFlag">
			<div class="login_box">
			     <el-form label-width='0.8rem' :model='Loginform' :rules='rules' ref='ruleForm'>
			      <el-form-item prop='account'>
					  <el-icon><User /></el-icon>
			        <el-input v-model='Loginform.account' placeholder="请输入用户名" >
			        </el-input>
			      </el-form-item>
			      <el-form-item prop='password'>
					  <el-icon><Lock /></el-icon>
			        <el-input v-model='Loginform.password' type='password' show-password placeholder="请输入密码"></el-input>
			      </el-form-item>
			      <div class='item_button'>
			        <el-button type='primary' @click='login(ruleForm)'>登 录</el-button>
			      </div>
			      </el-form>
			    </div>
		</el-card>
	</div>
</template>
<script setup>
	import {
		User,
		Lock,
	} from '@element-plus/icons-vue'
	import {ref,getCurrentInstance} from 'vue'
	import { useRouter } from "vue-router";
	import md5 from "js-md5";
	const {proxy} = getCurrentInstance()
	const router = useRouter()
	const form=ref({})
	const Loginform = ref({})
	const isFlag=ref(false)
		const ss=document.cookie
		let cookieStr= getCookieValue("token",ss)
		if(cookieStr){
			router.push("/home")
		}else{
			isFlag.value=true
		}
	function getCookieValue(key,cookies){
			  let cookiesArr=cookies.split(";")
			  for(let i of cookiesArr){
				  let coo= cookies.trim().split("=")
				  let keyname=coo[0]
				  if (keyname==key){
					  return coo[1]
				  }
			  }
		  }
	const ruleForm = ref({
	  account: '',
	  password: '',
	})
	const rules = ref({
	  account: [
	    { required: true, message: '用户名不能为空', trigger: 'blur' },
	  ],
	  password: [
	    { required: true, message: '密码不能为空', trigger: 'blur' },
	  ],
	  })
	  const login=async (formEl)=>{
		  // console.log(md5(Loginform.value.password));
		 
		  if (!formEl) return
		await formEl.validate(async(valid, fields) => {
		    if (valid) {
		     const pwd=proxy.$encrypt.encrypt(md5(Loginform.value.password))
		     const form = {
		     	account:Loginform.value.account,
		     	password:pwd
		     }
		     const {data: res} = await proxy.$login.login.getAuth(form)
			 console.log(res);
			 if(res.data!=null&&res.data!=undefined){
				 const token=res.data
				 document.cookie="token="+token+";path=/"
				 router.push("/home")
			 }
		    } else {
		      console.log('error submit!')
		    }
		  })
		  // console.log(md5(Loginform.value.password));
			 
	  }
	  
</script>
<style scoped lang="scss">
	.bgss{
		width: 100%;
		height: 100vh;
		.top_title {
		  height: 12%;
		  padding: 1% 1.5%;
		  box-sizing: border-box;
		  min-width: 950px;
		  .top_title_content {
		    background-color: white;
		    margin: 0 auto;
		    border-radius: 15px;
		    height: 120%;
		    display: flex;
		    justify-content: space-around;
		    position: relative;
		    .top_title_content_left {
		      display: flex;
		      position: absolute;
		      left: 3%;
		      top: 50%;
		      transform: translateY(-50%);
		      img {
		        width: 32px;
		        margin-right: 0.2rem;
		      }
		      p {
		        font-size: 0.3rem;
		      }
		    }
		    .top_title_content_right {
		      display: flex;
		      position: absolute;
		      top: 50%;
		      transform: translateY(-50%);
		      right: 3%;
		      p {
		        font-size: 0.2rem;
		        font-weight: bolder;
		        margin-left: 0.2rem;
		        line-height: 100px;
		      }
		    }
		  }
		}
		.box-card {
		  width:40%;
		  height: 50%;
		  margin: 0 auto;
		  margin-top: 1.3rem;
		  border-radius: 0.5rem;
		  display: flex;
		  align-items: center;
		  justify-content: center;
		}
	}
	::v-deep .el-form-item__label{
		font-size: 0.2rem !important;
	}
	
	  .login_box {
		  margin-top: 0.5rem;
	    background-color: white;
	    border-radius: 4%;
	    padding: 15px;
	    box-sizing: border-box;
	  }
	  .el-form-item{
	    border-bottom: 1px solid black;
	  }
	  .el-form-item .el-icon svg{
	    width: 25px;
		height:25px;
	    margin-left: -0.8rem;
	  }
	  .el-form-item .el-input{
	    width: 80%;
	    margin-left: 5px;
	    margin-top: 5px;
	  }
	  :deep(.el-form-item .el-input__wrapper) {
	    box-shadow: none;
	  }
	  .el-button {
	    width: 90%;
	    color: white;
	    border-radius: 0.5em;
		 background-color: rgb(18, 16, 29);
	    font-size: 0.3rem;
		padding: 0.2rem 0;
	  }
	 	
	 .el-button:hover {
	   background-color: white;
	   color: rgb(18, 16, 29);
	   border: 1px solid black;
	 }
	 ::v-deep .el-input__inner{
	 	 font-size: 0.3rem !important; 
	  }
	  
</style>