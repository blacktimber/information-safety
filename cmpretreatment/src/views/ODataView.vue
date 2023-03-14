<template>
  <div>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item>崇明区部门政务信息系统集成接入项目</el-breadcrumb-item>
    <el-breadcrumb-item>日志预处理系统</el-breadcrumb-item>
    <el-breadcrumb-item>日志源管理</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="top">
    <el-button @click="addOdata">添 加</el-button>
  </div>
  <el-table
    :data="logList"
    style="width: 100%"
    :row-style="rowState"
    :header-cell-style="headerStyle"
    :cell-style="cellStyle"
  >
    <el-table-column prop="yyfName" label="名 称" />
    <el-table-column prop="yyfFacility" label="源 名" />
    <el-table-column prop="yyfHost" label="I P" />
    <el-table-column prop="yyfUrl" label="U R L" />
    <el-table-column prop="yyfLinkman" label="联 系 人" />
    <el-table-column prop="yyfPhone" label="联 系 电 话" />
    <el-table-column label="操 作">
      <template #default="scope">
        <el-button
          type="primary"
          :icon="Edit"
          size="large"
          @click="changeOdata(scope.row.yyfId)"
          title="修改"
        ></el-button>
        <el-button
          type="primary"
          :icon="Delete"
          size="large"
          @click="deleteOdata(scope.row.yyfId)"
          title="删除"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>

  <!--  添加日志源-->
  <el-dialog
    title="添 加 日 志 源"
    :model-value="dialogVisibleAdd"
    :close-on-click-modal="false"
    width="50%"
    @close="closeAdd"
  >
    <el-form
      label-width="30%"
      :model="addForm"
      :rules="addRules"
      status-icon
      ref="addRef"
    >
      <el-form-item prop="yyfName" label="名称:">
        <el-input v-model="addForm.yyfName"></el-input>
      </el-form-item>
      <el-form-item prop="yyfFacility" label="源名称:">
        <el-select
          v-model="addForm.yyfFacility"
          placeholder="选择源名称"
          clearable
          @change="onameChange"
          @clear="onameClear"
        >
          <el-option
            v-for="item in onameOpts"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="yyfHost" label="ip:">
        <el-select
          v-model="addForm.yyfHost"
          placeholder="选择IP地址"
          clearable
          :allow-create="true"
          :filterable="true"
        >
          <el-option
            v-for="item in ipOpts"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="yyfUrl" label="URL:">
        <el-input v-model="addForm.yyfUrl"></el-input>
      </el-form-item>
      <el-form-item prop="yyfLinkman" label="联系人:">
        <el-input v-model="addForm.yyfLinkman"></el-input>
      </el-form-item>
      <el-form-item prop="yyfPhone" label="联系电话:">
        <el-input v-model="addForm.yyfPhone"></el-input>
      </el-form-item>
      <div class="item_button">
        <span class="dialog-footer">
          <el-button @click="dialogVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="toAddOdata">确 定</el-button>
        </span>
      </div>
    </el-form>
  </el-dialog>

  <!--    修改日志源-->
  <el-dialog
    title="修 改 日 志 源"
    :model-value="dialogVisibleChange"
    :close-on-click-modal="false"
    width="50%"
    @close="closeChange"
  >
    <el-form
      label-width="30%"
      :model="changeForm"
      :rules="addRules"
      status-icon
      ref="changeRef"
    >
      <el-form-item prop="yyfName" label="名称:">
        <el-input v-model="changeForm.yyfName"></el-input>
      </el-form-item>
      <el-form-item prop="yyfFacility" label="源名称:">
        <el-select
          v-model="changeForm.yyfFacility"
          placeholder="选择源名称"
          clearable
          @change="onameChange"
        >
          <el-option
            v-for="item in onameOpts"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="yyfHost" label="ip:">
        <el-select
          v-model="changeForm.yyfHost"
          placeholder="选择IP地址"
          clearable
        >
          <el-option
            v-for="item in ipOpts"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="yyfUrl" label="URL:">
        <el-input v-model="changeForm.yyfUrl"></el-input>
      </el-form-item>
      <el-form-item prop="yyfLinkman" label="联系人:">
        <el-input v-model="changeForm.yyfLinkman"></el-input>
      </el-form-item>
      <el-form-item prop="yyfPhone" label="联系电话:">
        <el-input v-model="changeForm.yyfPhone"></el-input>
      </el-form-item>
      <div class="item_button">
        <span class="dialog-footer">
          <el-button @click="dialogVisibleChange = false">取 消</el-button>
          <el-button type="primary" @click="toChangeOdata">确 定</el-button>
        </span>
      </div>
    </el-form>
  </el-dialog>

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
</template>

<script setup>
import { ArrowRight, Edit, Delete } from "@element-plus/icons-vue";
import { reactive, ref, getCurrentInstance, onMounted } from "vue";
import img from "../assets/imgs/warning.png";

const { proxy } = getCurrentInstance();
// 日志源列表
const logList = reactive([]);
// 分页器
const queryInfo = reactive({
  currentPage: 1,
  pageSize: 14,
});
const total = ref(0);

// 添加日志源
let orgList = reactive([]); // 接受后端的初始数据源
const addForm = reactive({
  yyfName: "",
  yyfFacility: "",
  yyfHost: "",
  yyfUrl: "",
  yyfLinkman: "",
  yyfPhone: "",
});
const onameOpts = reactive([]); // 数据源初始数据
const ipOpts = reactive([]); // ip初始数据
const dialogVisibleAdd = ref(false);
const addRef = ref("");
const addRules = reactive({
  yyfName: [
    { required: true, message: "请输入自定义日志源名称", trigger: "blur" },
  ],
  yyfFacility: [
    // { required: true, message: '请选择日志源名称', trigger: 'blur' }
  ],
  yyfHost: [
    { required: true, message: "请选择日志源ip地址", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (
          /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(
            value
          ) === false
        ) {
          callback(new Error("请输入正确的ip地址"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  yyfUrl: [
    { required: true, message: "请输入url路径", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (
          /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(
            value
          ) === false
        ) {
          callback(new Error("请输入正确的url路径地址"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  yyfLinkman: [
    { required: true, message: "请输入日志源管理人姓名", trigger: "blur" },
  ],
  yyfPhone: [
    { required: true, message: "请输入日志源管理人电话", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (/^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/.test(value) === false) {
          callback(
            new Error("请输入正确的电话或手机号,固定电话号： 区号-电话号")
          );
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});

// 修改日志源
const dialogVisibleChange = ref(false);
let thisId = ref(0);
const changeForm = reactive({});
const changeRef = ref("");

// 表格头th样式
const headerStyle = () => {
  return {
    "font-size": "0.18rem",
    color: "black",
    "text-align": "center",
    "font-weight": "bolder",
    border: "1px soild black",
  };
};
// 单元格td样式
const cellStyle = () => {
  return {
    "text-align": "center",
    color: "black",
    "font-size": "0.15rem",
    height: "0.6rem",
  };
};
// 行tr样式
const rowState = (row) => {
  if (row.rowIndex % 2 !== 0)
    return {
      backgroundColor: "#F5F5F5",
    };
};

// 根据分页器切换每页的日志源
const handleCurrentChange = (val) => {
  queryInfo.currentPage = val;
  getOdata();
};

onMounted(() => {
  getOdata();
});

// 获取日志源
const getOdata = async () => {
  const { data: res } = await proxy.$http.OdataService.getLog(queryInfo);
  if (res.code !== 200) return proxy.$message("获取数据源列表失败");
  if (!res.data === false) {
    total.value = res.data.total;
    logList.length = 0;
    for (let i = 0; i < res.data.records.length; i++) {
      logList.push(res.data.records[i]);
    }
  }
  
};
/* **********添加日志源********** */
const addOdata = async () => {
  const { data: res } = await proxy.$http.OdataService.getOrginLog();
  if (res.code !== 200) return proxy.$message("初始数据源获取失败");
  if (res.data.length !== 0) {
    let middle = [];
    orgList.length = 0;
    for (let i = 0; i < res.data.length; i++) {
      orgList.push(res.data[i]);
      middle.push(res.data[i].yysFacility);
    }
    onameOpts.length = 0;
    for (let i = 0; i < Array.from(new Set(middle)).length; i++) {
      onameOpts.push({ value: Array.from(new Set(middle))[i] });
    }
  }
  dialogVisibleAdd.value = true;
};
// 源初始数据改变时触发
const onameChange = (value) => {
  ipOpts.length = 0;
  if (orgList.length !== 0) {
    for (let i = 0; i < orgList.length; i++) {
      if (value === orgList[i].yysFacility)
        ipOpts.push({ value: orgList[i].yysHost });
    }
  }
};
// 源初始数据清空时触发
const onameClear = () => {
  ipOpts.length = 0;
  addForm.yyfHost = "";
};
const closeAdd = () => {
  dialogVisibleAdd.value = false;
};
const toAddOdata = () => {
  console.log(addForm);
  addRef.value.validate(async (valid) => {
    if (!valid) return;
    else {
      const { data: res } = await proxy.$http.OdataService.addLog(addForm);
      if (res.code !== 200) return proxy.$message.error("添加数据源失败");
      proxy.$message.success("添加数据源成功");
      getOdata();
      dialogVisibleAdd.value = false;
      addRef.value.resetFields();
    }
  });
};

/* **********修改日志源********** */
const changeOdata = async (id) => {
  thisId.value = id;
  const { data: resO } = await proxy.$http.OdataService.getOrginLog();
  if (resO.code !== 200) return proxy.$message("初始数据源获取失败");
  if (resO.data.length !== 0) {
    let middle = [];
    orgList.length = 0;
    for (let i = 0; i < resO.data.length; i++) {
      orgList.push(resO.data[i]);
      middle.push(resO.data[i].yysFacility);
    }
    onameOpts.length = 0;
    for (let i = 0; i < Array.from(new Set(middle)).length; i++) {
      onameOpts.push({ value: Array.from(new Set(middle))[i] });
    }
  }
  const { data: res } = await proxy.$http.OdataService.getLogChange({
    item: id,
  });
  console.log(res);
  if (res.code !== 200) return proxy.$message.error("获取数据源数据失败");
  changeForm.yyfHost = res.data.yyfHost;
  changeForm.yyfLinkman = res.data.yyfLinkman;
  changeForm.yyfName = res.data.yyfName;
  changeForm.yyfPhone = res.data.yyfPhone;
  changeForm.yyfUrl = res.data.yyfUrl;
  dialogVisibleChange.value = true;
};
const closeChange = () => {
  dialogVisibleChange.value = false;
};
const toChangeOdata = () => {
  const id = thisId.value;
  changeRef.value.validate(async (valid) => {
    if (!valid) return;
    else {
      const { data: res } = await proxy.$http.OdataService.changeLog({
        ...changeForm,
        id,
      });
      if (res.code !== 200) return proxy.$message.error("修改数据源失败");
      proxy.$message.success("修改数据源成功");
      getOdata();
      dialogVisibleChange.value = false;
    }
  });
};

const deleteOdata = (id) => {
  proxy.$messageBox
    .confirm(
      '<img style="width: 0.25rem; margin-right: 0.1rem;" src=' +
        img +
        '><div style="display: flex; justify-content: center"><el-icon><Edit /> </el-icon><p>此操作将永远删除该数据源,是否继续？</p></div>',
      "删 除 数 据 源",
      {
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
        cancelButtonClass: "el-mes-btn",
        confirmButtonClass: "el-mes-btn",
        dangerouslyUseHTMLString: true,
      }
    )
    .then(async () => {
      const { data: res } = await proxy.$http.OdataService.deleteLog({
        item: id,
      });
      if (res.code !== 200) return proxy.$message.error("删除日志源失败");
      getOdata();
      return proxy.$message.success("删除日志源成功");
    })
    .catch(() => {
      proxy.$message({
        type: "info",
        message: "取消删除",
      });
    });
};
</script>

<style scoped lang="scss">
.top {
  position: relative;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  margin: 20px 0;

  .el-button {
    position: absolute;
    right: 0.4rem;
    background-color: rgb(18, 16, 29);
    color: white;
    font-size: 0.15rem;
    height: 35px;
    border: none;
  }

  .el-button:hover {
    background-color: white;
    color: rgb(18, 16, 29);
    border: 1px solid black;
  }
}

.el-table {
  border: 1px solid grey;

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

.el-form {
  width: 80%;
  margin: 0 auto;

  :deep(.el-form-item__label) {
    font-size: 0.16rem;
    font-weight: bolder;
    margin-right: 0.2rem;
  }

  .el-select {
    width: 100%;
  }

  .el-input {
    border-radius: 15px;
    overflow: hidden;
  }

  :deep(.el-input__wrapper) {
    border-radius: 15px;
    border: none;
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
