<template>
	<div class="exbody">
		<div class="strps" v-if="VisibleAdd">
			<strps @goOut="goOut" @complete="complete"  @Editcomplete="Editcomplete" :formss="form" :visible="Visibletwo"/>
		</div>
		<div class="exbody_main" v-if="!VisibleAdd">
			<div class="title">
				{{form.name}}
			</div>
			<div class="Ex_body">
				<div class="show">
					<showBody v-if="form.radio==1">
						<template v-for="(item,index) in form.optiop" :key="index" v-slot:[index+1]>
							<echartsStep @echartClick="echartClick" v-if="isFlag"  :option="item"/>
						</template>
					</showBody>
					<custom v-if="form.radio==2">
						<template v-for="(item,index) in form.optiop" :key="index" v-slot:[index+1]>
							<echartsStep @echartClick="echartClick" v-if="isFlag" :option="item" />
						</template>
						</custom>
						<custom2 v-if="form.radio==3">
							<template v-for="(item,index) in form.optiop" :key="index" v-slot:[index+1]>
								<echartsStep @echartClick="echartClick" v-if="isFlag" :option="item" />
							</template>
							</custom2>
						<custom3 v-if="form.radio==4">
								<template v-for="(item,index) in form.optiop" :key="index" v-slot:[index+1]>
									<echartsStep @echartClick="echartClick" v-if="isFlag" :option="item" />
								</template>
						</custom3>
				</div>
				<div class="btn-list">
					<div class="btnss">
						<Switch class="btnss_icon" @click="SwitchChange" />
						<span>切换</span>
					</div>
					<div class="btnss">
						<CirclePlus class="btnss_icon" @click="dialogAdd"/>
						<span>增加</span>
					</div>
					<div class="btnss">
						<Delete class="btnss_icon" @click="dialogDelete" />
						<span> 删除 </span>
					</div>
					<div class="btnss">
						<Edit class="btnss_icon" @click="dialogEdit"/>
						<span> 修改 </span>
					</div>
				</div>
			</div>

		</div>
	</div>
	<Dialog title="删除模板" :dialogVisibleDelete="dialogVisibleDelete" @determine="determineDelete" @cancel="cancelDelete">
		<template #>
			<img :src="warning" alt="" class="dialogimg">
			<span class="dialogspan">
				此操作将永久删除当前模板，是否继续？</span>
		</template>
	</Dialog>
	<Dialog title="切换模板" :dialogVisibleDelete="dialogVisibleSwitch" @determine="determineSwitch" @cancel="cancelSwitch">
		<template #>
			<el-scrollbar height="3rem">
			<el-radio-group v-model="radio" text-color="#ffffff" fill="#ffffff" class="radio-group">
				<el-radio v-for="(item,index) in radioList" :key="index" :label="item.label">{{item.value}}</el-radio>
			</el-radio-group>
			</el-scrollbar>
		</template>
	</Dialog>
	<!-- <el-dialog
		class="bigop"
	   :model-value="VisibleBig"
	   :modal="false"
	   :draggable="true"
	   width="50%" 
	   @close="VisibleBig=false"
	   style="border-radius: 10px;
		background-color:rgba(100,100,100,.2);
		height: 70%;"
	 >
	 <echartsStep class="main_three" v-if="isdialog" :option="bigoptiop"/>
	 </el-dialog> -->
</template>

<script setup>
	import {
		Delete,
		Edit,
		CirclePlus,
		Switch
	} from '@element-plus/icons-vue'
	import echartsStep from '@/components/echartsStep.vue'
	import showBody from '@/components/Template/show.vue'
	import custom from '@/components/Template/custom.vue'
	import custom2 from '@/components/Template/custom2.vue'
	import custom3 from '@/components/Template/custom3.vue'
	import Dialog from '@/components/dialog.vue'
	import strps from '@/components/steps.vue'
	import warning from '@/assets/imgs/warning.png'
	import {
		ref,onMounted,getCurrentInstance,nextTick,require
	} from 'vue'
	import { useStore } from 'vuex' // 引入useStore 方法
	import axios from 'axios'
	import { useRouter } from "vue-router";
	const router = useRouter()
	const store = useStore()  // 该方法用于返回store 实例
	const optionEcharts = store.state.optionEcharts
		const {proxy} = getCurrentInstance()
		
	// const name = ref("")
	// 删除按钮弹出框
	const dialogVisibleDelete = ref(false)
	const Visibletwo = ref(false)
	// 切换按钮弹出框
	const dialogVisibleSwitch = ref(false)
	// 添加修改按钮弹出框
	const VisibleAdd=ref(false)
	// 放大模块
	const VisibleBig = ref(false)
	const radio = ref(1)
	const radioList=ref([])
	// const optionEcharts= ref([])
	// 打开添加按钮
	const dialogAdd = () => {
		Visibletwo.value=false
		VisibleAdd.value=true
			
		
	}
	//删除弹框打开按钮
	const dialogDelete = () => {
		if(form.value.id==1){
			proxy.$message.error('默认模板不可删除')
		}else{
			dialogVisibleDelete.value = true
		}
	}
	// 删除弹框确定按钮
	const determineDelete = (flag) => {
		dialogVisibleDelete.value = flag.value
		getData({
			item:3
		})
	}
	// 删除弹框取消按钮
	const cancelDelete = (flag) => {
		dialogVisibleDelete.value = flag.value
	}
	// 打开切换按钮 获取模板列表数据
	const SwitchChange = async() => {
		const {data: res} = await proxy.$http.Exhibition.getModelList()
		if (res.code !== 200) return proxy.$message.error('获取数据失败')
		radioList.value=[]
		for (let i=0;i<res.data.length;i++) {
				const obj={label:res.data[i].modelId,value:res.data[i].modelName}
				radioList.value.push(obj)
		}
		dialogVisibleSwitch.value=true
	}
	// 切换弹框确定按钮
	const determineSwitch = (flag) => {
		dialogVisibleSwitch.value = flag.value
		let id=radio.value
		getData({
			item:id
		})
	}
	// 切换弹框取消按钮
	const cancelSwitch = (flag) => {
		dialogVisibleSwitch.value = flag.value
	}
	// 打开修改按钮
	const dialogEdit=()=>{
		Visibletwo.value=true
		VisibleAdd.value=true
	}
	// 模板取消按钮
	const goOut=()=>{ 
		VisibleAdd.value=false
		getData({
			item:app1.value.modelId
		})
		// nextTick(()=>{
		// 	isFlag.value=true
		// })
	}
	
	// 修改模板完成按钮
	const Editcomplete=async (mas)=>{
		mas.modelId=app1.value.modelId
		const {data: res} = await proxy.$http.Exhibition.EditType(mas)
		if (res.code !== 200) return proxy.$message.error('获取数据失败')
		getData({
			item:app1.value.modelId
		})
		VisibleAdd.value=false
	}
	
	// 添加模板完成按钮 
	const complete=async (mas)=>{
		// console.log(mas);
		const {data: res} = await proxy.$http.Exhibition.AddType(mas)
		if (res.code !== 200) return proxy.$message.error('获取数据失败')
		VisibleAdd.value=false
	}
	onMounted(() => {
	  getData({
			item:3
		});
	});
	// 存储显示数据
	const form=ref({})
	// 存储第一层数据
	const app=ref({})
	// 存储默认模板数据
	const app1=ref({})
	const getData=async (item)=>{
		const {data: res1} = await proxy.$http.Exhibition.getType(item)
		if (res1.code !== 200) return proxy.$message.error('获取数据失败')
		// console.log(res1);
		app1.value=res1.data
		const {data: res} = await proxy.$http.Exhibition.getData()
		if (res.code !== 200) return proxy.$message.error('获取数据失败')
		app.value=res.data
		form.value={}
		refData(res.data,res1.data)
	}
	// 复用函数
	const refData=(data,data2)=>{
		isFlag.value=false
		const optiop=[]
		let m = 0
		if (data2.modelType == 1) m = 7
		else if (data2.modelType == 2) m = 4
		else if (data2.modelType == 3) m = 6
		else if (data2.modelType == 4) m = 5
		optiop.length=m
		for(let j=0;j<data2.list.length;j++){
		const opt={}
		if(data2.list[j]==""){
			opt.type=0
		}else{
			opt.type=data2.list[j]
		}
		opt.XData=[]
		opt.YData=[]
		for(let i =0;i<data.length;i++){
			opt.XData.push(data[i].name)
			opt.YData.push(data[i].counts)
		}
		optiop[j]=opt
		}
		form.value.optiop=proxy.$method.write.echartsShow(optiop)
		
		// form.value=data
		form.value.radio=data2.modelType
		form.value.name=data2.modelName
		nextTick(()=>{
			isFlag.value=true
		})
	}
	const isFlag =ref(true)
	const first=ref({})
	// 进入详细页面
	const info=ref({})
	const echartClick=async (e)=>{
		for(let i=0; i<app.value.length;i++){
			if(app.value[i].name==e){
				info.value.facility=app.value[i].facility
				info.value.host=app.value[i].host
			}
		}
		if(e=="WARN" || e=="NOTICE" || e=="ERROR"){
			const routeUrl = router.resolve({
			       path: "/selectTotal",
				   query:{
					   info:proxy.$method.read.encode(
					   JSON.stringify(
					   {
						   "facility": info.value.facility,
						   "host": info.value.host,
						   "level":e,
					   })
					   )
					}
			     });
			     window.open(routeUrl.href, "_blank");
		}else{
		
		const {data: res} = await proxy.$http.Exhibition.getList(info.value)
		if (res.code !== 200) return proxy.$message.error('获取数据失败')
		// const {data: res2} = await proxy.$http.Exhibition.getOPrg({level:"NOTICE"})
		// if (res2.code !== 200) return proxy.$message.error('获取数据失败')
		first.value=res.data
		isFlag.value=false
		const optiop=[]
		let m = 0
		if (app1.value.modelType == 1) m = 7
		else if (app1.value.modelType == 2) m = 4
		else if (app1.value.modelType == 3) m = 6
		else if (app1.value.modelType == 4) m = 5
		optiop.length=m
		for(let j=0;j<app1.value.list.length;j++){
		const opt={}
		if(app1.value.list[j]==""){
			opt.type=0
		}else{
			opt.type=app1.value.list[j]
		}
		opt.XData=[]
		opt.YData=[]
		for(let i =0;i<res.data.length;i++){
			opt.XData.push(res.data[i].level)
			opt.YData.push(res.data[i].counts)
		}
		optiop[j]=opt
		}
		form.value.optiop=proxy.$method.write.echartsShow(optiop)
		// form.value=data
		form.value.radio=app1.value.modelType
		form.value.name=app1.value.modelName
		nextTick(()=>{
			isFlag.value=true
		})
		}
	}
	// // 点击各个模块
	// const bigoptiop=ref([])
	// const isdialog=ref(true)
	// const clog=(index)=>{
	// 	VisibleBig.value=true
	// 	// isdialog.value=false
	// 	 // nextTick(() => {
	// 		 bigoptiop.value=form.value.optiop[index]
	// 		 // console.log(bigoptiop.value);
	// 	// })
	// 	// nextTick(() => {
	// 	// 	isdialog.value=true
	// 	// })
	// }
</script>

<style scoped lang="scss">
	.exbody {
		width: 100%;
		height: 100%;
		position: relative;
		
		.exbody_main {
			width: 100%;
			height: 90%;
			.title {
				// background-color:red;
				font-size: 0.3rem;
				text-align: left;
				padding-top:0.2rem ;
				padding-left:0.2rem ;
			}
			.Ex_body {
				width: 100%;
				display: flex;
				height:100%;
			}
			.show {
				width: 80%;
				height: 100%;
				padding-top: 0.4rem;
				padding-left: 10%;
				// padding-right: 1rem;
			}

			.btn-list {
				height: 4rem;
				width: 10%;
				margin: 0 auto;
				.btnss {
					width: 100%;
					height: 25%;
					.btnss_icon {
						width: 100%;
						height: 0.5rem;
						display: block;
						margin: 0 auto;
						margin-bottom: 0.08rem;
					}

					span {
						font-size: 0.16rem;
						display: block;
						margin: 0 auto;
					}
				}
			}
		}
	}
	.dialogspan {
		font-size: 0.20rem;
		color: black;
		position: relative;
		font-weight: 500;
	}
	
	.dialogimg {
		width: 0.20rem;
	}
	/deep/.el-radio {
		width: 70%;
		height: 0.6rem;
		margin: 0 auto;
	
		.el-radio__label {
			color: #000 !important;
			font-size: 0.25rem;
		}
	
		.el-radio__input {
			margin-bottom: px(5);
	
			.el-radio__inner {
				width: 0.3rem;
				height: 0.3rem;
				background-color: #fff;
				// border-color: #000;
				border: 0.04rem solid #000;
			}
	
			&.is-checked {
				.el-radio__inner {
					width: 0.3rem;
					height: 0.3rem;
					background-color: #000;
					border-color: #000;
				}
			}
	
			.el-radio__inner::after {
				width: 0.15rem;
				height: 0.15rem;
				border: 0.04rem solid #fff;
				background-color: #000;
			}
		}
	
	}
	
</style>
