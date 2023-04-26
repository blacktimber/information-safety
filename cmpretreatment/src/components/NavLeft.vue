<template>
  <!--  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">-->
  <!--    <el-radio-button :label="false">expand</el-radio-button>-->
  <!--    <el-radio-button :label="true">collapse</el-radio-button>-->
  <!--  </el-radio-group>-->
  <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      router
  >
    <div class="left_title">
      <p>日 志 预 处 理 系 统</p>
    </div>
    <template v-for="(item, index) in menuList" :key="index">
      <el-menu-item :index="item.url" @click="go">
        <img :src="item.isActive ? item.activeImg : item.beforeImg" alt="img">
<!--        <img src="@/assets/imgs/go1.png" alt="img">-->
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </template>

    <div class="left_url">
		 	<img    v-for="(item, index) in imginfo" :key="index" :src="item.src" :alt="item.alt" :title="item.imgtitle" @click="gotopath(item.goUrl)">
    </div>
  </el-menu>
</template>

<script setup>
  import {reactive, ref, onMounted} from "vue";
  import { useRouter } from "vue-router";
  import img1 from '../assets/imgs/yylb1.png'
  import img2 from '../assets/imgs/yylb2.png'
  import img3 from '../assets/imgs/yylb3.png'
  import img4 from '../assets/imgs/yylb4.png'
  import img5 from '../assets/imgs/yylw1.png'
  import img6 from '../assets/imgs/yylw2.png'
  import img7 from '../assets/imgs/yylw3.png'
  import img8 from '../assets/imgs/yylw4.png'
	import img11 from '@/assets/imgs/go4.png'
	import img12 from '@/assets/imgs/go1.png'
	import img13 from '@/assets/imgs/go3.png'
  const activeIndex = ref('')
  const router = useRouter()
  // nav值
  const menuList = reactive([
    {url: '/pretreatment/odata', title: '日 志 源 管 理', beforeImg: img5, activeImg: img1, isActive: true},
    {url: '/pretreatment/sublevel', title: '分 段 操 作', beforeImg: img6, activeImg: img2, isActive: false},
    {url: '/pretreatment/participle', title: '分 词 操 作', beforeImg: img7, activeImg: img3, isActive: false},
    {url: '/pretreatment/keywords', title: '关 键 字 管 理', beforeImg: img8, activeImg: img4, isActive: false}
  ])
const imginfo=ref([
		{src:img12,alt:"标准化策略语言系统",imgtitle:"前往标准化策略语言系统",goUrl:window.g.GOURL2},
		{src:img11,alt:"可视化策略体系系统",imgtitle:"前往可视化策略体系系统",goUrl:window.g.GOURL3},
		{ src:img13,alt:"零信任工作平台",imgtitle:"前往零信任工作平台",goUrl:window.g.GOURL4},
	])
  onMounted(() => {
    // activeIndex.value = window.sessionStorage.getItem('activePath')
    // if (!activeIndex.value) activeIndex.value = '/pretreatment/odata'
    // router.push(activeIndex.value)
    for (let i = 0; i < menuList.length; i++) {
      if (activeIndex.value === menuList[i].url) menuList[i].isActive = true
      else menuList[i].isActive = false
    }
  })

  const go = index => {
    for (let i = 0; i < menuList.length; i++) {
      if (index.index === menuList[i].url) menuList[i].isActive = true
      else menuList[i].isActive = false
    }
    // window.sessionStorage.setItem('activePath', index.index)
    activeIndex.value = index.index
  }
  const gotopath=(index)=>{
  	window.open(index)
  }
</script>

<style scoped lang="scss">
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
  .el-menu-item.is-active, .el-menu-item.is-active {
    background-color: white !important;
    color: black;
  }
  .el-menu-item.is-active:hover, .el-menu-item:hover {
    background-color: white !important;
    color: black;
  }
 .left_url {
 	position: absolute;
 	bottom: 6%;
 	display: flex;
 	justify-content: space-around;
 
 	img {
 		width: 17%;
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
</style>
