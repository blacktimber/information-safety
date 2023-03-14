<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item>崇明区部门政务信息系统集成接入项目</el-breadcrumb-item>
    <el-breadcrumb-item>日志预处理系统</el-breadcrumb-item>
    <el-breadcrumb-item>分段操作</el-breadcrumb-item>
  </el-breadcrumb>
  <!--  <div class="top">-->
  <!--    <el-date-picker-->
  <!--        v-model="dateNow"-->
  <!--        popper-class="elDatePicker"-->
  <!--        type="daterange"-->
  <!--        unlink-panels-->
  <!--        range-separator="至"-->
  <!--        start-placeholder="开始日期"-->
  <!--        end-placeholder="结束日期"-->
  <!--        :shortcuts="shortcuts"-->
  <!--        :disabled-date="disabledDate"-->
  <!--    />-->
  <!--  </div>-->
  <!--  <el-scrollbar height="200px">-->
  <div style="margin-top: 1.3rem">
    <div class="tab_title">数据源</div>
    <el-tabs tab-position="left" class="demo-tabs" style="height: 80%" @tab-click="handleClick">
      <template v-for="(item, i) in labels" :key="i">
        <el-tab-pane :label="item.yyfName">
          <div class="right_title">所有数据均来自于数据源：<p style="font-weight: bolder">{{ item.yyfName }}</p></div>
          <div class="right_reg">
            <div class="right_reg_title">
              <p>正则表达式：</p>
              <div class="right_reg_content">
                <div class="showReg">
                  <p v-for="(itemSon, iSon) in subList.regList" :key="iSon">{{ itemSon.yyrName }} : {{
                      itemSon.yyrRegular
                    }}</p>
                </div>
                <p >
                  <template v-for="(itemSon, iSon) in subList.regList" :key="iSon">
                    {{ itemSon.yyrName }} : {{itemSon.yyrRegular }}&nbsp;&nbsp;&nbsp;
                  </template>
                  </p>
              </div>
            </div>

            <div class="right_reg_btn">
              <!--              <el-button :icon="MagicStick" title="测试" @click="testReg"></el-button>-->
              <el-button :icon="Edit" title="修改正则" @click="changeReg"></el-button>
            </div>
          </div>
          <div class="right_data">
            <template v-for="(itemGirl, iGirl) in subList.logList" :key="iGirl">
              <div class="content_box">
                <div class="content_old">正则规则：{{ itemGirl.regularKey }}</div>
                <div class="content_results">
                  <p style="height: 50px; line-height: 50px;">正则结果:&nbsp;&nbsp;</p>
                  <template v-for="(itemGirlSon, iGirlSon) in itemGirl.regularValues" :key="iGirlSon">
                    <div class="content_result" v-if="itemGirlSon !== ''" @click="toDetail(itemGirlSon)">{{itemGirlSon}}</div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>

  <!--  </el-scrollbar>-->

  <!--  添加日志源-->
  <el-dialog
      title="修 改 正 则 规 则"
      :model-value="dialogVisible"
      :close-on-click-modal="false"
      width="50%" @close='closeDia'>
    <el-form label-width='30%' :model='regForm' :rules="regRules" status-icon ref="cgThisRegRef">
      <el-form-item prop='log' label='日志原文：'>
        <el-input v-model='testLog'></el-input>
      </el-form-item>
      <div class="btn_add">
        <el-button @click="addReg" style="margin-bottom: 10px; right: 0; font-size: 0.35rem; width: 30px; height: 30px;"
                   title="添加正则">+
        </el-button>
      </div>
      <el-form-item
          v-for="(reg, index) in regForm.regs"
          :key="index"
          :label="'正则' + (index+1) + '：'"
          :prop="'regs.' + index + '.rule'"
          :rules="{
        required: true,
        message: '正则名称和规则不能为空',
        trigger: 'blur',
      }"
      >
        <div class="a_reg">
          <el-input placeholder="正则名" v-model="reg.yyrName" style="width: 25%;" @blur="check(index)"/>
          <el-input placeholder="正则规则" v-model="reg.yyrRegular" style="width: 60%;" @blur="check(index)"/>
          <el-button :disabled="index === 0" @click="removeReg(reg)" title="删除正则"
                     style="width: 30px; height: 30px; font-size: 0.35rem; line-height: 10px">-
          </el-button>
        </div>
        <!--        <el-button class="mt-2" @click.prevent="removeDomain(domain)">Delete</el-button>-->
      </el-form-item>
      <div class="test_reg">
        <el-button @click="toTestReg">测试结果</el-button>
        <div class="test_result">
          <span v-for="(itemQ, indexQ) in testRegs" :key="indexQ">
            {{itemQ.name}} : {{itemQ.value}}<br/>
          </span>
        </div>
      </div>
      <div class='item_button'>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="toChangeReg">确 定</el-button>
        </span>
      </div>
    </el-form>
  </el-dialog>
</template>

<script setup>
import {
  ArrowRight, Edit
} from '@element-plus/icons-vue'
import {onMounted, reactive, ref, getCurrentInstance} from "vue";
import {useRouter} from "vue-router";
// import img from "@/assets/imgs/warning.png";

const router = useRouter()
const {proxy} = getCurrentInstance()
/* 日期 */
// const dateNow = ref('')
// const shortcuts = reactive([
//   {
//     text: '过去一周',
//     value: () => {
//       const end = new Date()
//       const start = new Date()
//       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
//       return [start, end]
//     },
//   },
//   {
//     text: '过去一个月',
//     value: () => {
//       const end = new Date()
//       const start = new Date()
//       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
//       return [start, end]
//     },
//   }
// ])
// 数据源列表
const labels = reactive([])
// 分段列表
const subList = reactive({
  regList: [],
  logList: []
})

// 提交正则
const dialogVisible = ref(false)
const regForm = reactive({
  regs: [{yyrName: '', yyrRegular: ''}]
})
const regRules = reactive([])
// 当前数据源的唯一标识
const queryInfo = {
  yyrHost: '',
  yyrFacility: ''
}
// 测试正则结果
const testRegs = reactive([])
const cgThisRegRef = ref('')
onMounted(() => {
  // getTitleHeight()
  getAllOdataName()
})
// 获取数据源列表
const getAllOdataName = async () => {
  const {data: res} = await proxy.$http.BasicsService.getOlist()
  if (res.code !== 200) return proxy.$message.error('获取数据源列表失败')
  labels.length = 0
  for (let i = 0; i < res.data.length; i++) {
    labels.push(res.data[i])
  }
  queryInfo.yyrHost = labels[0].yyfHost
  queryInfo.yyrFacility = labels[0].yyfFacility
  getReg()
  getRegAndSub()
}
// tabs切换
const handleClick = tab => {
  console.log('tab', tab)
  for (let i = 0; i < labels.length; i++) {
    if (tab.props.label === labels[i].yyfName) {
      queryInfo.yyrHost = labels[i].yyfHost
      queryInfo.yyrFacility = labels[i].yyfFacility
    }
  }
  getReg()
  getRegAndSub()
}
/*日期*/
// const disabledDate = (time) => {
//   return time.getTime() >= Date.now() - 86400000
// }

// 测试日志
// const testReg = () => {
//   proxy.$messageBox.confirm(
//       '<img style="width: 0.25rem; margin-right: 0.1rem;" src=' + img + '><div style="display: flex; justify-content: center"><el-icon><Edit /> </el-icon><p>是否以此正则规则进行测试？</p></div>',
//       '测 试 正 则 规 则',
//       {
//         confirmButtonText: '确认',
//         cancelButtonText: '取消',
//         cancelButtonClass: 'el-mes-btn',
//         confirmButtonClass: 'el-mes-btn',
//         dangerouslyUseHTMLString: true
//       }
//   ).then(async () => {
//     return proxy.$message({
//       type: 'success',
//       message: '获取测试结果成功',
//     })
//   })
//       .catch(() => {
//         proxy.$message({
//           type: 'info',
//           message: '取消',
//         })
//       })
// }
// 获取分段结果
const getRegAndSub = async () => {
  const {data: res} = await proxy.$http.SublevelService.getAllSubReg({facility: queryInfo.yyrFacility, host: queryInfo.yyrHost})
  if (res.code !== 200) return proxy.$message.error('获取初始化数据错误')
  subList.logList.length = 0
  for (let i = 0; i < res.data.length; i++) {
    subList.logList.push(res.data[i])
  }
}

// 获取正则
const getReg = async () => {
  const {data: res} = await proxy.$http.SublevelService.getReg(queryInfo)
  if (res.code !== 200) return proxy.$message.error('获取正则失败')
  subList.regList.length = 0
  for (let i = 0; i < res.data.length; i++) {
    res.data[i].rule = 'go'
    subList.regList.push(res.data[i])
  }
}

// 修改正则
const changeReg = () => {
  if (subList.regList.length !== 0) {
    regForm.regs.length = 0
    for (let i = 0; i < subList.regList.length; i++) {
      regForm.regs.push(subList.regList[i])
    }
  }
  dialogVisible.value = true
}
const closeDia = () => {
  dialogVisible.value = false
}
const toChangeReg = () => {
  cgThisRegRef.value.validate(async valid => {
    if (!valid) return
    for (let i = 0; i < regForm.regs.length; i++) {
      regForm.regs[i].yyrHost = queryInfo.yyrHost
      regForm.regs[i].yyrFacility = queryInfo.yyrFacility
    }
    const {data: res} = await proxy.$http.SublevelService.addReg(regForm.regs)
    if (res.code !== 200) return proxy.$message.error('修改正则失败')
    proxy.$message.success('修改正则成功')
    getReg()
    getRegAndSub()
    dialogVisible.value = false
  })

}
const testLog = ref('')

// 增加正则
const addReg = () => {
  regForm.regs.push({
    yyrName: '', yyrRegular: ''
  })
}
// 删除正则
const removeReg = item => {
  const index = regForm.regs.indexOf(item)
  if (index !== -1) {
    regForm.regs.splice(index, 1)
  }
}

// 检查正则
const check = index => {
  if (regForm.regs[index].yyrRegular !== '' && regForm.regs[index].yyrName !== '') regForm.regs[index].rule = 'go'
  else regForm.regs[index].rule = ''
}

// 测试正则
const toTestReg = async () => {
  const {data: res} = await proxy.$http.SublevelService.testReg({msg: testLog.value, regularDtoList: regForm.regs})
  console.log(res)
  if (res.code !== 200) return proxy.$message.error('获取测试结果失败')
  testRegs.length = 0
  for (let i = 0; i < res.data.length; i++) {
    // if (res.data[i].value === '') proxy.$message.error(res.data[i].name + '：正则规则有误')
    testRegs.push(res.data[i])
  }
}

// 查询分段结果
const toDetail = item => {
  const go = router.resolve({
    path: '/detail',
    query: {item, ...queryInfo}
  })
  window.open(go.href, '_blank')
}
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  position: relative;
  margin: 20px 0 50px;

  :deep(.el-range-editor.el-input__wrapper) {
    position: absolute;
    right: 0.4rem;
    background-color: rgb(18, 16, 29);
    border-radius: 15px;
    height: 40px;
  }

  :deep(.el-date-editor .el-range-input) {
    color: white;
    font-weight: bolder;
  }

  :deep(.el-date-editor .el-range-separator) {
    color: white;
  }
}

.tab_title {
  font-size: 0.3rem;
  font-weight: bolder;
  position: absolute;
  transform: translateY(-0.5rem)
}

.right_title {
  font-size: 0.2rem;
  text-align: left;
  display: flex;
  box-sizing: border-box;
  margin: 0 0.5rem;
}

.right_reg {
  margin: 0.4rem 0.5rem;
  display: flex;
  height: 0.3rem;
  width: 91.5%;
  line-height: 45px;
  justify-content: space-between;
  .right_reg_title {
    display: flex;
    width: 90%;
    p {
      min-width: 120px;
      font-size: 0.2rem;
      text-align: left;
    }
    .right_reg_content {
      margin-left: 0.2rem;
      font-size: 0.18rem;
      flex-wrap: wrap;
      display: flex;
      height: 110%;
      width: 80%;
      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
        width: 100%;
        height: 100%;
        line-height: 45px;
        font-weight: bolder;
      }
    }
  }
  .right_reg_content:hover .showReg {
    display: block;
  }

  .right_reg_btn .el-button {
    background-color: white;
    color: rgb(18, 15, 29);
    border: 1px solid rgb(18, 15, 29);
    height: 45px;
    width: 45px;
    font-size: 0.2rem;
    transform: translateY(-15px);
  }

  .right_reg_btn .el-button:hover {
    background-color: rgb(18, 15, 29);
    color: white;
  }
}

.right_data {
  margin-top: 0.4rem;
  font-size: 0.2rem;

  .content_box {
    text-align: left;
    border-radius: 15px;
    border: 2px solid rgb(18, 15, 29);
    box-sizing: border-box;
    margin: 0.2rem auto;
    padding: 15px;
    width: 90%;

    .content_old {
      font-weight: bolder;
    }

    .content_results {
      margin-top: 0.15rem;
      display: flex;
      flex-wrap: wrap;

      .content_result {
        margin-top: 10px;
        font-size: 0.18rem;
        background-color: rgb(151, 150, 156);
        color: white;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 5px 10px;
        margin-right: 0.3rem;
        height: 30px;
        cursor: pointer;
      }
      .content_result:hover {
        background-color: black;
      }
    }
  }
}

.showReg {
  position: absolute;
  background-color: rgba(18, 15, 29, 0.8);
  color: white;
  font-size: 0.15rem;
  transform: translateX(2rem) translateY(-0.4rem);
  padding: 10px 10px 0;
  display: none;
  border-radius: 15px;

  p {
    margin-top: -15px;
  }
}

.el-form {
  width: 100%;
  margin: 0 auto;

  .btn_add {
    display: flex;
    justify-content: right;
    width: 75%;
    margin: 10px auto;
  }

  :deep(.el-form-item__label) {
    font-size: 0.16rem;
    font-weight: bolder;
    margin-right: 0.2rem;
  }

  .el-select {
    width: 25%;
  }

  .el-input {
    width: 80%;
    border-radius: 15px;
    overflow: hidden;
    margin-right: 3%;
  }

  .el-button {
    background-color: white;
    color: rgb(18, 16, 29);
    border: 1px solid black;
    font-size: 0.15rem;
    height: 35px;

    box-sizing: border-box;
  }

  .el-button:hover {
    background-color: rgb(18, 16, 29);
    color: white;
    border: none;
    box-sizing: border-box;
  }

  :deep(.el-input__wrapper) {
    border-radius: 15px;
    border: none;
  }

  .test_reg {
    display: flex;
    width: 70%;
    margin: 50px 20%;
    text-align: left;

    .el-button {
      height: inherit;
      margin-right: 20px;
    }

    .test_result {
      box-sizing: border-box;
      border-radius: 15px;
      border: 1px solid black;
      padding: 20px;
      width: 120%;
    }
  }

  .item_button {
    margin-top: 0.9rem;

    .dialog-footer {
      display: flex;
      width: 100%;
      justify-content: center;

      .el-button {
        background-color: rgb(18, 16, 29);
        color: white;
        font-size: 0.15rem;
        height: 35px;
        width: 1rem;
        border: none;
        box-sizing: border-box;
        margin: 0 0.5rem;
      }

      .el-button:hover {
        background-color: white;
        color: rgb(18, 16, 29);
        border: 1px solid black;
      }
    }
  }
}
</style>
