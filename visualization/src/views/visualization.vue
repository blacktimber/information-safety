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
	import img1 from '@/assets/imgs/bg11.png'
	import img2 from '@/assets/imgs/bg21.png'
	import img5 from '@/assets/imgs/bg12.png'
	import img6 from '@/assets/imgs/bg22.png'
	import img11 from '@/assets/imgs/go4.png'
	import img12 from '@/assets/imgs/go1.png'
	import img14 from '@/assets/imgs/go2.png'
	import img13 from '@/assets/imgs/go3.png'
	const parentMsg=ref([
	  {url: '/visualization/Exhibition', title: '分析展示', beforeImg: img5, activeImg: img1, isActive: false,
	  },
	  {url: '/visualization/Administration', title: '可视化模板', beforeImg: img6, activeImg: img2, isActive: false,
	  },
	  ])
	const title=ref('可视化策略体系')
	const imginfo=ref([
		{ src:img13,alt:"零信任工作平台",imgtitle:"前往零信任工作平台",goUrl:window.g.GOURL4},
		{src:img12,alt:"标准化策略语言系统",imgtitle:"前往标准化策略语言系统",goUrl:window.g.GOURL2},
		{src:img14,alt:"日志预处理系统",imgtitle:"前往日志预处理系统",goUrl:window.g.GOURL1},
	])
</script>

<style>
</style>