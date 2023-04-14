<template>
	<div style="width: 100%;height: 100%;">
		<div class="top">设备源</div>
		<div class="main">
			
		</div>
	</div>
</template>

<script setup>
	import {ref,onMounted,getCurrentInstance,reactive} from 'vue'
	const {proxy} = getCurrentInstance()
	onMounted(()=>{
	})
</script>

<style scoped lang="scss">
	.top{
		height: 1rem;
		font-size: 0.4rem;
		text-align: left;
		padding: 0.2rem;
	}
	.main{
		width: 100%;
		height: 80%;
	}
</style>