<template>
<div>
  <el-breadcrumb :separator-icon="ArrowRight" >
    <el-breadcrumb-item>崇明区部门政务信息系统集成接入项目</el-breadcrumb-item>
    <el-breadcrumb-item>日志预处理系统</el-breadcrumb-item>
    <el-breadcrumb-item>关键字管理</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="top" >
    <el-select v-model='queryInfo.type' placeholder="选择源名称" clearable @change="wordsTypeChange" :popper-append-to-body="false" popper-class="select-popper">
      <el-option
          v-for="item in type"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
  </div>
  <div style="margin-top: 0.6rem">
    <div class="tab_title">
      <div>数据源</div>
    </div>
    <el-tabs tab-position="left" class="demo-tabs" style="height: 100%" @tab-click="handleClick">
      <template v-for="(item, i) in labels" :key="i">
        <el-tab-pane :label="item.yyfName">
          <div class="right_title">所有数据均来自于数据源：<p style="font-weight: bolder">{{ item.yyfName }}</p></div>
          <div class="right_words">
            <el-table :data="keywordsList" style="width: 100%; margin-top: 25px" :row-style="rowState" :header-cell-style="headerStyle"
                      :cell-style="cellStyle">
              <el-table-column prop="keyWord" label="词 汇 名 称"/>
              <el-table-column prop="isCheck" label="词 汇 类 别"/>
              <el-table-column label="操 作">
                <template #default="scope">
                  <el-button type="primary" :icon="Delete" size='large' @click='deleteKeywords(scope.row.id)'
                             title="删除"></el-button>
                  <el-button type="primary" :icon="Reading" size='large' @click='goKeywords(scope.row.keyWord)'
                             title="查看管理日志原文"></el-button>
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
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
  </div>
</template>

<script setup>
import {
  ArrowRight, Delete, Reading
} from '@element-plus/icons-vue'
import {getCurrentInstance, onMounted, reactive, ref} from "vue";
import img from "@/assets/imgs/warning.png";
import {useRouter} from "vue-router";
const labels = reactive([])
const {proxy} = getCurrentInstance()
const router = useRouter()
const queryInfo = reactive({
  currentPage: 1,
  pageSize: 13,
  type: ''
})
const total = ref(0)
const queryInfoIp = reactive({})
const type = reactive([
  {label: '关键字', value: 0},
  {label: '非关键字', value: 1},
  {label: '用户字段', value: 2}
])
const keywordsList = reactive([])

const headerStyle = () => {
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
// 行tr样式
const rowState = (row) => {
  if (row.rowIndex % 2 !== 0)
    return {
      backgroundColor: '#F5F5F5'
    }
}
onMounted(() => {
  // getTitleHeight()
  getAllOdataName()
})
const getAllOdataName = async () => {
  const {data: res} = await proxy.$http.BasicsService.getOlist()
  if (res.code !== 200) return proxy.$message.error('获取数据源列表失败')
	console.log(res.data);
  labels.length = 0
  for (let i = 0; i < res.data.length; i++) {
    labels.push(res.data[i])
  }
  queryInfoIp.facility = labels[0].yyfFacility
  queryInfoIp.host = labels[0].yyfHost
  getKeywordsList()
}

// tabs切换
const handleClick = tab => {
  for (let i = 0; i < labels.length; i++) {
    if (tab.props.label === labels[i].yyfName) {
      queryInfoIp.facility = labels[i].yyfFacility
      queryInfoIp.host = labels[i].yyfHost
    }
  }
  getKeywordsList()
}
// 获取分类词汇列表
const getKeywordsList = async () => {
  // console.log({...queryInfoIp, ...queryInfo})
  const {data: res} = await proxy.$http.KeywordsService.getAllWords({...queryInfoIp, ...queryInfo})
  
  if (res.code !== 200) return proxy.$message.error('获取词库失败')
  // console.log(res.data.records)
  keywordsList.length = 0
  console.log(res.data);
  for(let i = 0; i < res.data.records.length; i++) {
    if (res.data.records[i].isCheck === 0) res.data.records[i].isCheck = '关键字'
    if (res.data.records[i].isCheck === 1) res.data.records[i].isCheck = '非关键字'
    if (res.data.records[i].isCheck === 2) res.data.records[i].isCheck = '用户字段'
    keywordsList.push(res.data.records[i])
  }
  total.value = res.data.total
}
// 根据分页器切换每页的关键字
const handleCurrentChange = val => {
	// console.log(queryInfo);
  queryInfo.currentPage = val
  getKeywordsList()
}
// 切换分类
const wordsTypeChange = () => {
  getKeywordsList()
}

// 删除词汇分类
const deleteKeywords = id => {
  proxy.$messageBox.confirm(
      '<img style="width: 0.25rem; margin-right: 0.1rem;" src=' + img + '><div style="display: flex; justify-content: center"><el-icon><Edit /> </el-icon><p>此操作将删除该分类词汇,是否继续？</p></div>',
      '删 除 分 类 词 汇',
      {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        cancelButtonClass: 'el-mes-btn',
        confirmButtonClass: 'el-mes-btn',
        dangerouslyUseHTMLString: true
      }
  ).then(async () => {
    const {data: res} = await proxy.$http.KeywordsService.deleteAllWords({item: id})
    if (res.code !== 200) return proxy.$message.error('删除分类词汇失败')
    getKeywordsList()
    return proxy.$message.success('删除分类词汇成功')
  })
      .catch(() => {
        proxy.$message({
          type: 'info',
          message: '取消删除',
        })
		console.log({item: id});
      })
}

// 查看关键字关联日志原文
const goKeywords = item => {
  const go = router.resolve({
    path: '/detail',
    query: {item, ...queryInfoIp}
  })
  window.open(go.href, '_blank')
}
</script>

<style scoped lang="scss">
.top {
  position: relative;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  margin: 20px 0;

  .el-select {
    position: absolute;
    right: 0.4rem;
    height: 60px;
    width: 300px;
    background-color: red;
    border-radius: 15px;
    overflow: hidden;
  }


  .el-input-bg-color {
    background-color: #409EFF;
  }

  :deep(.el-input__inner) {
    background-color: rgb(18,15,29);
    padding: 30px 20px;
    font-weight: bolder;
    font-size: 18px;
    &::placeholder {
      color: white;
      font-weight: bolder;
      font-size: 18px
    }
  }

  :deep(.el-select .el-input .el-select__caret) {
    color: white;
  }

  :deep(.el-select-dropdown__item.selected) {
    span {
      color: red !important;
    }
  }
}
:deep(.el-input__wrapper) {
  background-color: rgb(18,15,29)
}

:deep(.el-input__inner) {
  color: white
}
	.tab_title {
	  font-size: 0.3rem;
	  font-weight: bolder;
	  position: absolute;
	  transform: translateY(-0.5rem);
	  display: flex;
	  width: 30%;
	  min-width: 500px;
	  div:nth-child(2) {
	    margin-left: 40%;
	  }

}
.tabs_box {
  height: 80%;
  margin-top: 1rem;
}
.right_title {
  font-size: 0.2rem;
  text-align: left;
  display: flex;
  box-sizing: border-box;
  margin: 0 0.5rem;
}
.el-table {
  .el-button {
    background-color: rgba(255, 255, 255, 0);
    color: black;
    font-size: 0.3rem;
    width: 0.3rem;
    border: none;
  }

  .el-button:hover {
    background-color: black;
    color: white;
  }
}
.select-popper {
  .el-select-dropdown__item.selected {
    color: black;
  }
}
</style>
