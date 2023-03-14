<template>
	<div>
		<el-dialog :title="title" :model-value="dialogVisibleAdd" :close-on-click-modal="false" width="50%"
			@close='closeDia' style="border-radius: 10px;">
			<el-form label-width='20%' status-icon ref="cgThisRegRef">
				<el-form-item prop='log'>
					<span
						style="margin-left: -30px; font-size: 22px;font-weight: 600;position: absolute;left: -80px;top:24px">
						策略名字</span>
					<el-input class="text-center" v-model='StrNameEdit' style="width:6.48rem;"></el-input>
				</el-form-item>
				<el-button class="btn_add" @click="addeg" title="添加策略">+
				</el-button>
				<el-form-item v-for="(ite,ind) of inpNum" :key="ind" style=" width:90%; margin-left: 0.195rem;">
					<el-col :span="4" class="text-center">
						<el-select v-model="form[ind].region1" @change="changeWords">
				 		<el-option :label="item.label" :value="item.label" v-for="(item,index) in options"
								:key="index" />
						</el-select>
					</el-col>
					<el-col :span="4" class="text-center">
						<el-select v-model="form[ind].region2">
							<el-option :label="item.label" :value="item.value" v-for="(item,index) in option1"
								:key="index" />
						</el-select>
					</el-col>
					<el-col :span="5" class="text-center">
						<el-input v-model="form[ind].region3" @change="inputChange"></el-input>
					</el-col>
					<el-col :span="3" class="text-center">
						<el-select v-model="form[ind].region4">
							<el-option :label="item.label" :value="item.value" v-for="(item,index) in option2"
								:key="index" />
						</el-select>
					</el-col>
					<el-button class="text-center" :disabled="ind === 0" @click="removeReg(ind)" title="删除策略"
						style="width: 30px; height: 30px; font-size: 0.35rem; line-height: 30px">-
					</el-button>
				</el-form-item>
				<div class="test_reg">
					<el-button @click="toTestReg">测试结果</el-button>
		 		<div class="test_result">
						<span v-for="(itemQ, indexQ) in testRegs" :key="indexQ">
							{{itemQ}}<br />
						</span>
					</div>
				</div>
				<div class='item_button'>
					<span class="dialog-footer">
						<el-button @click="goOut">取 消</el-button>
						<el-button type="primary" @click="AddReg">确 定</el-button>
					</span>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup>
	import {
		ref,
		toRefs,
		defineProps,
		defineEmits,
		getCurrentInstance
	} from 'vue'
	const {
		proxy
	} = getCurrentInstance();
	const props = defineProps({
		//子组件接收父组件传递过来的值
		dialogVisible: Boolean,
		title: String,
		StrName: String,
		res: Object
	})
	const {
		dialogVisible,
		title,
		StrName,
		res
	} = toRefs(props)
	const StrNameEdit = ref("");
	StrNameEdit.value = StrName.value
	const dialogVisibleAdd = dialogVisible.value
	var inpNum = ref([""]);
	const form = ref([{
		region1: '',
		region2: '',
		region3: '',
		region4: ''
	}])
	// for(let i=0;i<res.value.length;i++){
	// 	console.log(inpNum);
	// }
		for (let i = 0; i < res.value.length; i++) {
			if (i > 0) {
				inpNum.value.push('')
				form.value.push({
					region1: '',
					region2: '',
					region3: '',
					region4: ''
				})
			}
			form.value[i].region1 = res.value[i][0]
			form.value[i].region2 = res.value[i][1]
			form.value[i].region3 = res.value[i][2]

			if (i + 1 < res.value.length) {
				form.value[i].region4 = res.value[i][3]
			}
		}
	const options = ref([])
	const option1 = ref([])
	const option2 = [{
			value: 'and',
			label: 'and',
		},
		{
			value: 'or',
			label: 'or',
		}
	]
	// +按钮
	const addeg = () => {
		inpNum.value.push('')
		form.value.push({
			region1: '',
			region2: '',
			region3: '',
			region4: ''
		})
	}
	// -按钮
	const removeReg = (index) => {
		inpNum.value.splice(index, 1);
		form.value.splice(index, 1);
	}
	const emit = defineEmits(['changdialogVisible', 'AddReg'])
	// 取消按钮
	const goOut = () => {
		emit('changdialogVisible')
	}
	// 关闭对话框
	const closeDia = () => {
		emit('changdialogVisible')
	}
	// 确定按钮
	const AddReg = () => {
		if (StrNameEdit.value == undefined || StrNameEdit.value == "" || StrNameEdit.value == null || StrNameEdit.value
			.indexOf(" ") >= 0) {
			proxy.$message("策略名不可为空");
		} else {
			emit('AddReg', StrNameEdit, getSqls())
		}

	}
	const testRegs = ref([])
	const sqls = ref("")
	const getSqls=()=>{
		changeWords()
		sqls.value=''
		for (let i = 0; i < form.value.length; i++) {
			if (form.value[i].region2.indexOf("%")>0) {
				if (form.value[i].region2 != "=") {
					form.value[i].region2 = form.value[i].region2.replace("*",form.value[i].region3)
					sqls.value += `${form.value[i].region1} ${form.value[i].region2}`
					if(i+1!=form.value.length){
						sqls.value+=` ${form.value[i].region4} `
					}
				}else{
					sqls.value += `${form.value[i].region1} ${form.value[i].region2} ${form.value[i].region3}`
				if(i+1!=form.value.length){
					sqls.value+=` ${form.value[i].region4} `
				}}
			} else {
				sqls.value += `${form.value[i].region1} ${form.value[i].region2} ${form.value[i].region3}`
				if(i+1!=form.value.length){
					sqls.value+=` ${form.value[i].region4} `
				}
			}
		}
		return sqls.value
	}
	// 测试按钮
	const toTestReg = async() => {
		changeWords()
		testRegs.value = []
		let flag = false;
		for (let i = 0; i < inpNum.value.length; i++) {
			// console.log(inpNum);
			for (let j = 0; j < form.value.length; j++) {
				if(i+1==form.value.length){
					if(form.value[j].region1==""||form.value[j].region2==""||form.value[j].region3==""){
								flag = true;
								proxy.$message("字段不可为空");
					}else{
						testRegs.value = []
					}
				}else{
					if(form.value[j].region1==""||form.value[j].region2==""||form.value[j].region3==""||form.value[j].region4==""){
								flag = true;
								proxy.$message("字段不可为空");
					}
				}
				if(flag){
					testRegs.value=[]
					break
				}
				
			}
		}
		if(title.value!="添加策略"){
			aliveSelect()
		}
		const {data: res} = await proxy.$http.Odata.testStrategy({sql: getSqls()})
		if (res.code !== 200) return proxy.$message.error('获取数据失败')
		if(res.data.yysMsg!=null){
			testRegs.value.push(res.data.yysMsg)
		}
		testRegs.value.push('未查询到数据')
	}
	const getSelect=async()=>{
		const {data: res2} = await proxy.$http.Odata.getlogtable({item: StrNameEdit.value})
		if (res2.code !== 200) return proxy.$message.error('获取数据失败')
		testRegs.value.push(res2.data[0].yysMsg)
	}
	const aliveSelect=async()=>{
		const queryInfo = {
		  currentPage: 1,
		  pageSize: 1,
		  name: StrNameEdit.value,
		  sql:getSqls()
		}
		const {data: res1} = await proxy.$http.Odata.selectLog(queryInfo)
		if (res1.code !== 200) return proxy.$message.error('缓存数据失败')
		getSelect()
	}
	// 获取数据库字段名
	const getWords = async () => {
		const {
			data: res
		} = await proxy.$http.Odata.getOlist()
		if (res.code !== 200) return proxy.$message.error('获取数据库字段失败')
		for (let i = 0; i < res.data.length; i++) {
			const words = {
				type: res.data[i].type,
				value: res.data[i].field,
				label: res.data[i].field
			}
			options.value.push(words)
		}
	}
	const lakey = ref("")
	// 选择器1变化后触发
	const changeWords = (e) => {
		const type = ref("")
		for (let i = 0; i < options.value.length; i++) {
			if (options.value[i].label == e) {
				type.value = options.value[i].type
			}
		}
		if (!type.value.indexOf('int')) {
			lakey.value = "int"
			option1.value = [{
					value: '>',
					label: '>',
				},
				{
					value: '<',
					label: '<',
				},
				{
			  value: '=',
					label: '=',
				},
				{
			 	value: '<=',
					label: '<=',
				},
				{
					value: '>=',
					label: '>=',
			 }
			]
		} else if (!type.value.indexOf('varchar')) {
			lakey.value = "char"
			option1.value = [{
					value: '=',
					label: '=',
				},
				{
					value: `like '%*%'`,
					label: `like '%*%'`,
				},
				{
					value: `like '*%'`,
			 	label: `like '*%'`,
				}
			]
		} else {
			lakey.value = "time"
			option1.value = [{
					value: '>',
					label: '>',
				},
			 {
					value: '<',
					label: '<',
				},
				{
					value: '=',
					label: '=',
				},
				{
					value: '<=',
					label: '<=',
				},
				{
					value: '>=',
					label: '>=',
				}
			]
		}
	}
	const val = ref([])
	const inputChange = (value) => {
		val.value.push(value)
	}

	getWords()
</script>

<style scoped lang="scss">
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
				border-radius: 0.055rem;
				margin: 0 0.5rem;
			}

			.el-button:hover {
				background-color: white;
				color: rgb(18, 16, 29);
				border: 1px solid black;
			}
		}
	}

	.dialogspan {
		font-size: 0.20rem;
		color: black;
		font-weight: 500;
		display: flex;
		flex-direction: row;

		.dialogDiv {
			width: 18%;
		}

		.el-input {
			width: 60%;
		}
	}

	.btn_add {
		margin-bottom: 10px;
		right: 0;
		font-size: 0.35rem;
		color: #666;
		width: 30px;
		height: 30px;
		position: absolute;
		top: 290px;
		right: 20px;
		z-index: 99;
	}

	.text-center {
		margin-right: 0.28rem;
		margin-top: 0.25rem;
		border-radius: 0.055rem;
		color: #666;
	}

	.test_reg {
		display: flex;
		width: 70%;
		margin-top: 0.8rem;
		margin-left: 0.9rem;

		.el-button {
			background-color: rgb(18, 16, 29);
			color: white;
			font-size: 0.15rem;
			height: 35px;
			width: 1rem;
			border: none;
			box-sizing: border-box;
			border-radius: 0.055rem;
			margin: 0 0.2rem;
		}

		.el-button:hover {
			background-color: white;
			color: rgb(18, 16, 29);
			border: 1px solid black;
		}


		.test_result {
			box-sizing: border-box;
			border-radius: 5px;
			border: 1px solid #ccc;
			padding: 20px;
			width: 120%;
		}
	}
</style>
