<template>
	<div>
		<div class="right_words">
            <el-table :data="keywordsList"  :header-cell-style="headerStyle" max-height="6.5rem" 
                      :cell-style="cellStyle" >
              <el-table-column v-for="(item,index) in tableList" :key="index" :prop="keyss[index]" :label="item.title">
			  </el-table-column>
			  <el-table-column :label="label" v-if="label=='操作'">
			  				   <template #default="scope">
			  					   <el-button  class="butn" :icon="Edit" size='large' @click='updateKeywords(scope.row)'
			  					              title="编辑设备源"></el-button>
			  					   <el-button class="butn" :icon="Delete" size='large' @click='deleteKeywords(scope.row)'
			  					              title="删除设备源"></el-button>
			  				   </template>
			  </el-table-column>
			  <el-table-column :label="label" v-if="label=='处理'">
			  				   <template #default="scope">
								   <div class="top">
									   <el-button   @click='callJournal(scope.row)'>处理</el-button>
								   </div>
			  				   </template>
			  </el-table-column>
              <!-- <el-table-column v-for="(item,index) in tableList" :key="index" :label="item.title"/> -->
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
	const {keywordsList,tableList,total,queryInfo,keyss, label} =toRefs(props)
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
	
	const emit = defineEmits(['deleteKeywords','updateKeywords','CurrentChange','callJournal'])
	// 删除按钮
	const deleteKeywords=(item)=>{
		emit('deleteKeywords',item)
	}
	// 修改按钮
	const updateKeywords=(item)=>{
		emit('updateKeywords',item)
	}
	// 处理按钮
	const callJournal=(item)=>{
		emit('callJournal',item)
	}
	// 切换页码
	const handleCurrentChange = val => {
	  emit('CurrentChange',val)
	}
	
</script>

<style  scoped lang="scss">
	.top {
	  .el-button {
	    right: 0.4rem;
	    background-color: rgb(18, 16, 29);
	    color: white;
	    font-size: 0.15rem;
	    height: 35px;
	    border: none;
		border-radius: 20%;
	  }
	
	  .el-button:hover {
	    background-color: white;
	    color: rgb(18, 16, 29);
	    border: 1px solid black;
	  }
	}
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
	::v-deep.cell{
		 word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 6;
		overflow: hidden; 
	}
	::v-deep.cell:hover{
		-webkit-line-clamp: unset !important;
	}
	
</style>