<template>
  <div>
  <!-- <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item>崇明区部门政务信息系统集成接入项目</el-breadcrumb-item>
    <el-breadcrumb-item>日志预处理系统</el-breadcrumb-item>
    <el-breadcrumb-item>分词操作</el-breadcrumb-item>
  </el-breadcrumb> -->
  <div >
     <div class="top" >
     	<div>设备源</div>
     </div>
	  <dataSource :labels="labels" @handleClick='handleClick'>
	  		<template #>
	  			<div class="right_title">所有数据均来自于数据源：<p style="font-weight: bolder">{{title}}</p></div>
	  			<div class="right_words">
	  			  <template v-for="(item, index) in words" :key="index">
	  			    <div class="right_word">
	  			      <div>{{item.keyWord}}:</div>
	  			      <el-radio-group v-model="item.isCheck" class="ml-4">
	  			        <el-radio :label="0">关键字</el-radio>
	  			        <el-radio :label="1">非关键字</el-radio>
	  			        <el-radio :label="2">用户字段</el-radio>
	  			      </el-radio-group>
	  			    </div>
	  			  </template>
	  			  <el-button :class="words.length < 10 ? 'bottom_button' : 'left_button'" @click="submitPartResult">提交</el-button>
	  			</div>
	  		</template>
	  </dataSource>
      <!-- <el-tabs tab-position="left" class="demo-tabs" style="height: 100%" @tab-click="handleClick">
        <template v-for="(item, i) in labels" :key="i">
          <el-tab-pane :label="item.yyfName">
            <div class="right_title">所有数据均来自于数据源：<p style="font-weight: bolder">{{ item.yyfName }}</p></div>
            <div class="right_words">
              <template v-for="(item, index) in words" :key="index">
                <div class="right_word">
                  <div>{{item.keyWord}}:</div>
                  <el-radio-group v-model="item.isCheck" class="ml-4">
                    <el-radio :label="0">关键字</el-radio>
                    <el-radio :label="1">非关键字</el-radio>
                    <el-radio :label="2">用户字段</el-radio>
                  </el-radio-group>
                </div>
              </template>
              <el-button :class="words.length < 10 ? 'bottom_button' : 'left_button'" @click="submitPartResult">提交</el-button>
            </div>
          </el-tab-pane>
        </template>
      </el-tabs> -->
  </div>
</div>
</template>

<script setup>
import {
  ArrowRight
} from '@element-plus/icons-vue'
import dataSource from '@/components/Scrollbar.vue'
import {onMounted, reactive, getCurrentInstance,ref} from "vue";

const {proxy} = getCurrentInstance()

const labels = reactive([])
const words = reactive([])
const queryInfo = reactive({})

onMounted(() => {
  // getTitleHeight()
  getAllOdataName()
})
const getAllOdataName = async () => {
  const {data: res} = await proxy.$http.BasicsService.getOlist()
  if (res.code !== 200) return proxy.$message.error('获取数据源列表失败')
  labels.length = 0
  for (let i = 0; i < res.data.length; i++) {
    labels.push(res.data[i])
  }
  queryInfo.facility = labels[0].yyfFacility
  title.value=labels[0].yyfName
  queryInfo.host = labels[0].yyfHost
  getPartResult()
}
const title=ref("")

// tabs切换
const handleClick = tab => {
	title.value=labels[tab].yyfName
 queryInfo.facility = labels[tab].yyfFacility
 queryInfo.host = labels[tab].yyfHost
  getPartResult()
}

// 获取分词结果
const getPartResult = async () => {
  const {data: res} = await proxy.$http.ParticipleService.getAllWords(queryInfo)
  if (res.code !== 200) return proxy.$message.error('获取词库失败')
  words.length = 0
  for(let i = 0; i < res.data.length; i++) {
    words.push({keyWord: res.data[i]})
  }
}

// 提交分词结果
const submitPartResult = async () => {
  const submitWords = []
  for (let i = 0; i < words.length; i++) {
    if (words[i].isCheck || words[i].isCheck === 0) {
      submitWords.push(words[i])
    }
  }
  const {data: res} = await proxy.$http.ParticipleService.postAllWords({yyfFacility: queryInfo.facility, yyfHost: queryInfo.host, values: submitWords})
  if (res.code !== 200) return proxy.$message.error('分词操作失败')
  proxy.$message.success('分词成功')
  getPartResult()
}
</script>

<style scoped lang="scss">
	.top {
	  width: 100%;
	  box-sizing: border-box;
	height: 1rem;
	font-size: 0.4rem;
	text-align: left;
	padding: 0.2rem;
	display: flex;
	justify-content: space-between;
	text-align: center;
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
.right_words {
  position: relative;
  width: 90%;
  margin: 0.3rem auto 0;
  .right_word {
    font-size: 0.2rem;
    font-weight: bolder;
    display: flex;
    margin-top: 0.2rem;
    div {
      width: 15%;
      line-height: 0.3rem;
      margin-right: 0.25rem;
	  word-break: break-all;
    }
    :deep(.el-radio__input.is-checked .el-radio__inner) {
      border-color: black;
      background-color: black;
    }
    :deep(.el-radio__input.is-checked+.el-radio__label) {
      color: black;
      font-weight: bolder;
    }
    :deep(.el-radio__input+.el-radio__label:hover) {
      font-weight: bolder;
    }
    .el-radio-group {
      width: 80%;
      .el-radio {
        width: 30%;
        :deep(.el-radio__label) {
          font-size: 0.2rem;
        }
      }
    }
  }
  .bottom_button {
    bottom: 5%;
    left: 65%;
  }
  .left_button {
    right: 3%;
    top: 50%;
  }
  .el-button {
    background-color: rgb(18, 16, 29);
    color: white;
    border: none;
    box-sizing: border-box;
    position: fixed;
    width: 1rem;
    height: 0.4rem;
  }
  .el-button:hover {
    background-color: white;
    color: rgb(18, 16, 29);
    border: 1px solid black;
    font-size: 0.15rem;
    height: 35px;
  }
}
</style>
