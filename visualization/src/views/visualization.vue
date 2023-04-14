<template>
	<div>
		<NavTop :info="parentMsg" :title="title" :imginfo="imginfo" :logImg="img11">
			<template #><router-view /></template>
		</NavTop>
	</div>
</template>

<script setup>
	import NavTop from '@/components/NavTop-use.vue'
	import {ref} from 'vue'
	import img1 from '@/assets/imgs/yylb1.png'
	import img2 from '@/assets/imgs/yylb2.png'
	import img3 from '@/assets/imgs/yylb3.png'
	import img5 from '@/assets/imgs/yylw1.png'
	import img6 from '@/assets/imgs/yylw2.png'
	import img7 from '@/assets/imgs/yylw3.png'
	import img11 from '@/assets/imgs/go4.png'
	import img12 from '@/assets/imgs/go1.png'
	import img14 from '@/assets/imgs/go2.png'
	import img13 from '@/assets/imgs/go3.png'
	const parentMsg=ref([
	  {url: '/visualization/Exhibition', title: '分析展示', beforeImg: img5, activeImg: img1, isActive: true,
	  },
	  {url: '/visualization/Administration', title: '可视化模板', beforeImg: img6, activeImg: img2, isActive: false,
	  },
	  ])
	const title=ref('可视化策略体系')
	const imginfo=ref([
		{ src:img13,alt:"零信任工作平台",imgtitle:"前往零信任工作平台",goUrl:"http://127.0.0.1:8005"},
		{src:img12,alt:"标准化策略语言系统",imgtitle:"前往标准化策略语言系统",goUrl:"http://127.0.0.1:8003"},
		{src:img14,alt:"日志预处理系统",imgtitle:"前往日志预处理系统",goUrl:"http://127.0.0.1:8002"},
	])
</script>

<style>
</style>