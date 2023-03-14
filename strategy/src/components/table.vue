<template>
	<div>
		<div class="right_words">
            <el-table :data="keywordsList"  :header-cell-style="headerStyle" max-height="5rem" 
                      :cell-style="cellStyle" >
              <el-table-column v-for="(item,index) in tableList" :key="index" :prop="keyss[index]" :label="item.title"/>
              <!-- <el-table-column v-for="(item,index) in tableList" :key="index" :label="item.title"/> -->
			  <el-table-column :label="label" v-if="label=='操作'">
				   <template #default="scope">
					   <el-button  class="butn" :icon="Edit" size='large' @click='updateKeywords(scope.row)'
					              title="编辑策略"></el-button>
					   <el-button class="butn" :icon="Delete" size='large' @click='deleteKeywords(scope.row.id)'
					              title="删除策略"></el-button>
						<el-button class="butn" :icon="VideoPlay" size='large' @click='gowords(scope.row)'
								             title="运行策略"></el-button>
				   </template>
              </el-table-column>
			  <el-table-column :label="label" v-if="label=='下载'">
			  				   <template #default="scope">
			  					   <el-button  class="butn" :icon="Download" size='large' @click='download(scope.row)'
			  					              title="下载日志"></el-button>
			  				   </template>
			  </el-table-column>
            </el-table>
          <el-pagination
              @current-change="handleCurrentChange"
              background
              layout="prev, pager, next"
              :total="total"
              :current-page="queryInfo.currentPage"
              :page-size="queryInfo.pageSize"
              class="pagination-container"
          />
          </div>
		  </div>
</template>

<script setup>
	import {
	  Delete, Edit,Download,VideoPlay
	} from '@element-plus/icons-vue'
	import {ref, toRefs, defineProps,defineEmits } from 'vue'
	const props = defineProps({
	  //子组件接收父组件传递过来的值
	  keywordsList: Array,
	  tableList:Array,
	  total:Number,
	  queryInfo:Object,
	  label:String,
	  keyss:Array
	})
	//使用父组件传递过来的值
	const {keywordsList,tableList,total,queryInfo,label,keyss} =toRefs(props)
	// 表头样式
	const headerStyle=()=>{
		return {
		  'font-size': '0.18rem',
		  'color': 'black',
		  'text-align': 'center',
		  'font-weight': 'bolder',
		  'border': '1px soild black'
		}
	}
	// 单元格td样式
	const cellStyle = () => {
	  return {
	    'text-align': 'center',
	    'color': 'black',
	    'font-size': '0.15rem',
	    'height': '0.6rem',
	  }
	}
	// 删除弹框
	const emit = defineEmits(['deleteKeywords','updateKeywords','CurrentChange','download','gowords'])
	const deleteKeywords=(index)=>{
		emit('deleteKeywords',index)
	}
	// 运行策略
	const gowords=(index)=>{
		emit('gowords',index)
	}
	// 修改弹框
	const updateKeywords=(item)=>{
		emit('updateKeywords',item)
	}
	// 切换页码
	const handleCurrentChange = val => {
	  emit('CurrentChange',val)
	}
	// 下载
	const download = val => {
		emit('download',val.yysFacility)
	  // emit('CurrentChange',val)
	}
	
</script>

<style  scoped lang="scss">
	.butn {
	  background-color: rgba(255, 255, 255, 0);
	  color: black;
	  font-size: 0.3rem;
	  width: 0.3rem;
	  border: none;
	}
		
	.butn:hover {
	  background-color: black;
	  color: white;
	}
	.pagination-container{
		float: right;
	}
	.cell{
		  white-space: nowrap; 
	}
</style>