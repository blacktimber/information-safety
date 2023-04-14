<script setup>
import { defineComponent } from 'vue'
  import { ElConfigProvider } from 'element-plus'
  import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<template>
	
	<router-view/>
	
	  <!-- <el-backtop :bottom="100">
	    </el-backtop> -->
</template>

<style >
	#app {
	  font-family: Avenir, Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  text-align: center;
	  color: #2c3e50;
	  
	}
	@import url(./style.css);
</style>
