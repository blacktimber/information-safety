<template>
  <div class="common-layout">
    <div class="top_title">
      <div class="top_title_content">
        <div class="top_title_content_left">
          <img src="../assets/imgs/logo.png" alt="logo">
          <p>崇明区部门政务信息系统集成接入项目</p>
        </div>
        <div class="top_title_content_right">
          <div class="top_img">
            <img :src="logImg" alt="logo_son">
          </div>
          <p>Welcome</p>
          <el-button @click="goOut">退 出</el-button>
        </div>
      </div>
    </div>
    <el-container style="margin-left: 0.8%">
      <el-aside>
		  <el-menu
		        :default-active="activeIndex"
		        class="el-menu-vertical-demo"
				router
		    >
		      <div class="left_title">
		        <p>{{title}}</p>
		      </div>
		      <template v-for="(item, index) in menuList" :key="index">
		        <!-- <el-menu-item  :index="item.url" @click="go(index)"> -->
				<el-menu-item  :index="item.url"  @click="go(index)" :class="item.isActive ? 'change' : 'befor'">
		          <img :src="item.isActive ? item.activeImg : item.beforeImg" alt="img">
		  <!--        <img src="@/assets/imgs/go1.png" alt="img">-->
		          <template #title>{{ item.title }}</template>
		        </el-menu-item>
		      </template>
				  <div class="left_url" >
						<img   v-for="(item, index) in imglist" :key="index":src="item.src" :alt="item.alt" :title="item.imgtitle" @click="gotopath(item.goUrl)">
				  </div>
		    </el-menu>
	  </el-aside>
      <el-container>
        <el-main>
			<slot >
			</slot>
		</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
	import { toRefs, defineProps } from 'vue'
	import { ref,onMounted} from "vue";
	import { useRouter } from "vue-router";
	
	const props = defineProps({
	  //子组件接收父组件传递过来的值
	  info: Array,
	  title:String,
	  imginfo:Array,
	  logImg:String
	})
	//使用父组件传递过来的值
	const {info,title,imginfo,logImg} =toRefs(props)
	const menuList=[...info.value]
	const imglist=[...imginfo.value]
	const activeIndex = ref('')
	const router = useRouter()
	// nav值
	onMounted(() => {
		activeIndex.value = "0"
	  for (let i = 0; i < menuList.length; i++) {
	    if (activeIndex.value === menuList[i].url) menuList[i].isActive = true
	    else menuList[i].isActive = false
	  }
	})
	const go = index => {
	  for (let i = 0; i < menuList.length; i++) {
	    if (index=== i) menuList[i].isActive = true
	    else menuList[i].isActive = false
	  }
	  activeIndex.value = index+''
	}
	const gotopath=(index)=>{
		window.open(index)
		
		// router.push(index)
	}
	const goOut=()=>{
	document.cookie = "token=;Path=/ ";
	// window.sessionStorage.removeItem('token')
	router.push("/login")
	}
</script>

<style scoped lang="scss">
  html, body, .common-layout {
    height: 100vh;
    min-height: 900px;
    background-color: rgb(227,225,226);
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
          .top_img{
            height: 60px;
            width: 60px;
            border-radius: 50%;
            transform: translateY(20px);
            overflow: hidden;
          }
          p {
            font-size: 0.2rem;
            font-weight: bolder;
            margin-left: 0.2rem;
            line-height: 100px;
          }
          img {
            width: 80%;
            transform: translateY(-0.3rem);
          }
          .el-button {
            background-color: rgb(18,16,29);
            color: white;
            font-size: 0.15rem;
            margin-left: 0.6rem;
            height: 35px;
            transform: translateY(30px);
            border: none;
          }
          .el-button:hover {
            background-color: white;
            color: rgb(18,16,29);
            border: 1px solid black;
          }
        }
      }
    }
    .el-container {
      height: 88%;
      width: 97.8%;
      .is-vertical {
        height: 120%;
      }
      .el-aside {
        width: 18%;
        min-width: 320px;
        min-height: 700px;
        border-radius: 15px;
        overflow: hidden;
        padding: 15px;
        box-sizing: border-box;
		.el-menu {
		  border-radius: 15px;
		  overflow: hidden;
		  background-color: rgb(18,15,29);
		  padding: 50px 20px;
		  width: 100.2%;
		  color: white;
		  height: 100%;
		  box-sizing: border-box;
		  font-weight: bolder;
		  position: relative !important;
		  .left_title {
		    width: 100%;
		    font-size: 0.23rem;
		    padding-bottom: 10%;
		    p {
		      border-bottom: 2px white solid;
		      padding: 20px 0px 30px;
		      width: 80%;
		      box-sizing: border-box;
		      margin: 0 auto;
		    }
		  }
		  .change{
			  background-color: white !important;
			  color: black!important;
		  }
		  .befor{
			  // background-color: white !important;
			  color: white;
		  }
		  .el-menu-item {
		    font-size: 0.18rem;
		    color: white;
		    margin-top: 18%;
		    border-radius: 15px;
		    overflow: hidden;
		    display: flex;
		    justify-content: center;
		    img {
		      width: 0.3rem;
		      margin-right: 0.1rem;
		      margin-left: -10%;
		    }
		  }
		  .el-menu-item:hover {
		    color: rgb(18,16,29);
		    background-color: white;
		  }
		  // .el-menu-item.is-active  {
		  //   background-color: white !important;
		  //   color: black;
		  // }
		  // .el-menu-item.is-active:hover, .el-menu-item:hover {
		  //   background-color: white !important;
		  //   color: black;
		  // }
		 .left_url {
		 	position: absolute;
		 	bottom: 6%;
		 	display: flex;
		 	justify-content: space-around;
		 
		 	img {
		 		width: 20%;
		 		padding: 0.6%;
		 		height: auto;
		 		display: block;
		 		background-color: #fff;
		 		border-radius: 50%;
		 		transform: translateY(-0.37rem);
		 		cursor: pointer;
		 	}
		 }
		 
		}
      }
      .el-header {
        width: 98%;
        height: 100px;
        background-color: white;
        margin-top: 20px;
        border-radius: 15px;
        position: relative;
        min-width: 400px;
      }
      .el-main {
		  width: 100%;
        background-color: white;
        margin: 0.2rem 0rem;
        border-radius: 15px;
        height: 108.5%;
      }
    }
  }
</style>
