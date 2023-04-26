<!--404界面-->
<template>
  <div>
    <h1>404 NOT FOUND</h1>
    <p>您访问到外星球了! 请检查路径是否正确</p>
    <button @click="back">返回登录</button>
  </div>
</template>
<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
const back = () => {
  router.push('/')
}
</script>

<style scoped>
div {
  height: 100vh;
  text-align: center;
  font-size: 25px;
  background-image: url("../assets/imgs/404bg.png");
  background-size: 100% 100%;
  color: white;
  padding:50px;
  box-sizing: border-box;
  text-align: center;
 
}
 h1{
    font-size: 50px;
  }
  p {
    margin-top: 50px;
  }
  button {
    margin-top: 50px;
    background-color: white;
    width: 150px;
    height: 60px;
    font-size: 18px;
  }
</style>
