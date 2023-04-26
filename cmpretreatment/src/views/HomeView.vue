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
            <img src="../assets/imgs/go2.png" alt="logo_son">
          </div>
          <p>Welcome</p>
          <el-button @click="goOut">退 出</el-button>
        </div>
      </div>
    </div>
    <el-container style="margin-left: 0.8%">
      <el-aside><NavLeft /></el-aside>
      <el-container>
<!--        <el-header><Navtop /></el-header>-->
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
// @ is an alias to /src
// import Navtop from '@/components/NavTop.vue'
import NavLeft from '@/components/NavLeft.vue'
	import { useRouter } from "vue-router";
	const router = useRouter()
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
        background-color: white;
        min-width: 400px;
        margin: 0.2rem 0rem;
        border-radius: 15px;
        height: 110%;
      }
    }
  }
</style>
