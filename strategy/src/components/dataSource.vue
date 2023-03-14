<template>
<div>
  <div style="margin-top: 0.2rem">
    <div class="tab_title">
      <div>数据源</div>
    </div>
    <el-tabs tab-position="left" class="demo-tabs" style="height: 100%;" @tab-click="handleClick" >
      <template v-for="(item, i) in labels" :key="i">
        <el-tab-pane :label="item.yyfName">
			<slot name="yyfName"></slot>
		</el-tab-pane>
      </template>
    </el-tabs>
  </div>
  </div>
</template>

<script setup>
	import { ref,toRefs, defineProps ,defineEmits} from 'vue'
	const props = defineProps({
	  //子组件接收父组件传递过来的值
	  labels: Array,
	})
	//使用父组件传递过来的值
	const {labels} =toRefs(props)
	const emit = defineEmits(['handleClick'])
	const handleClick=(tab)=>{
		emit('handleClick',tab)
	}
</script>

<style  lang="scss">
	.tab_title {
	  font-size: 0.3rem;
	  font-weight: bolder;
	  transform: translateY(-0.5rem);
	  float: left;
}
.tabs_box {
  height: 80%;
  margin-top: 1rem;
}
.yyfName{
	width: 50px;
	float: right;
}
	
.el-tabs--left .el-tabs__header.is-left{
		width: 15%;
		min-height: 600px;
		position: static;
	}
.el-tabs__active-bar.is-left{
	margin-top: -30px;
}
</style>
