<template>
	<div>
		<NavTop :info="parentMsg" :title="title" :imginfo="imginfo" :logImg="img13">
			<template #><router-view /></template>
		</NavTop>
	</div>
</template>

<script setup>
	import NavTop from '../components/NavTop-use.vue'
	import {ref} from 'vue'
	import img1 from '../assets/imgs/bg11.png'
	import img2 from '../assets/imgs/bg21.png'
	import img3 from '../assets/imgs/bg31.png'
	import img4 from '../assets/imgs/bg41.png'
	import img5 from '../assets/imgs/bg12.png'
	import img6 from '../assets/imgs/bg22.png'
	import img7 from '../assets/imgs/bg32.png'
	import img8 from '../assets/imgs/bg42.png'
	import img11 from '../assets/imgs/go4.png'
	import img12 from '../assets/imgs/go1.png'
	import img14 from '../assets/imgs/go2.png'
	import img13 from '../assets/imgs/go3.png'
	const parentMsg=ref([
	  {url: '/Management', title: '安全设备源', beforeImg: img5, activeImg: img1, isActive: true,
	  },
	  // {url: '/regular', title: '正则分词', beforeImg: img6, activeImg: img2, isActive: false,
	  // },
	  {url: '/callThePolice', title: '报警处理', beforeImg: img7, activeImg: img3, isActive: true,
	  },
	  {url: '/journal', title: '处理日志', beforeImg: img8, activeImg: img4, isActive: false,
	  },
	  ])
	const title=ref('零信任工作平台')
	const imginfo=ref([
		{ src:img11,alt:"可视化策略体系系统",imgtitle:"前往可视化策略体系系统",goUrl:window.g.GOURL3},
		{src:img12,alt:"标准化策略语言系统",imgtitle:"前往标准化策略语言系统",goUrl:window.g.GOURL2},
		{src:img14,alt:"日志预处理系统",imgtitle:"前往日志预处理系统",goUrl:window.g.GOURL1},
	])
</script>

<style>
</style>