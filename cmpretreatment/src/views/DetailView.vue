<template>
  <div>
<div class="title">【{{queryInfoData.item}}】关联日志原文</div>
  <el-table :data="logList" style="width: 90%; margin: 45px auto" :row-style="rowState" :header-cell-style="headerStyle"
            :cell-style="cellStyle">
    <el-table-column prop="yysHost" label="I P" min-width="200"/>
    <el-table-column prop="yysMsg" label="日 志 原 文" min-width="600" :show-overflow-tooltip="true" />
    <el-table-column prop="yysLevel" label="预 警 级 别"/>
  </el-table>
  <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="queryInfoData.currentPage"
      :page-size="queryInfoData.pageSize"
      class="pagination-container"
  />
</div>
</template>

<script setup>
  import {useRoute} from "vue-router";
  import {getCurrentInstance, onMounted, reactive, ref} from "vue";
  const route = useRoute()
  const {proxy} = getCurrentInstance()
  const queryInfoData = reactive({
    item: route.query.item,
    facility: route.query.yyrFacility || route.query.facility,
    host: route.query.yyrHost || route.query.host,
    currentPage: 1,
    pageSize: 15
  })
  onMounted(() => {
    getLogList()
  })

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

  const logList = reactive([])
  const total = ref(0)

  // 获取所有日志原文
  const getLogList = async () => {
    const {data: res} = await proxy.$http.BasicsService.getLog(queryInfoData)
    if (res.code !== 200) return proxy.$message.error('获取日志原文信息失败')
    console.log(res.data.records)
    logList.length = 0
    for (let i = 0; i < res.data.records.length; i++) {
      logList.push(res.data.records[i])
    }
    total.value = res.data.total
  }
  // 根据分页器切换每页的关键字
  const handleCurrentChange = val => {
    queryInfoData.currentPage = val
    getLogList()
  }
</script>

<style scoped>
.title {
  font-weight: bolder;
  font-size: 0.4rem;
  background-color: rgb(18,15,29);
  margin-top: 50px;
  color: white;
  padding: 10px 0;
}
</style>
