<template>
	<div class="exbody">
		<div class="strps" v-if="VisibleAdd">
			<strps @goOut="goOut" @complete="complete" :formss="form" :visible="Visibletwo"/>
		</div>
		<div class="exbody_main" v-if="!VisibleAdd">
			<div class="title">
				{{form.name}}
			</div>
			<div class="Ex_body">
				<div class="show">
					<showBody v-if="form.radio==0">
						<template v-for="(item,index) in form.optiop" :key="index" v-slot:[index+1]>
							<echartsStep   :option="item" @click="clog(index)"/>
						</template>
					</showBody>
					<custom v-if="form.radio==1">
						<template v-for="(item,index) in form.optiop" :key="index" v-slot:[index+1]>
							<echartsStep  :option="item"/>
						</template>
						</custom>
						<custom2 v-if="form.radio==2">
							<template v-for="(item,index) in form.optiop" :key="index" v-slot:[index+1]>
								<echartsStep  :option="item"/>
							</template>
							</custom2>
						<custom3 v-if="form.radio==3">
								<template v-for="(item,index) in form.optiop" :key="index" v-slot:[index+1]>
									<echartsStep :option="item"/>
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
				此操作将永久删除该信息，是否继续？</span>
		</template>
	</Dialog>
	<Dialog title="切换模板" :dialogVisibleDelete="dialogVisibleSwitch" @determine="determineSwitch" @cancel="cancelSwitch">
		<template #>
			<el-radio-group v-model="radio" text-color="#ffffff" fill="#ffffff" class="radio-group">
				<el-radio v-for="(item,index) in radioList" :key="index" :label="item.label">{{item.value}}</el-radio>
			</el-radio-group>
		</template>
	</Dialog>
	<el-dialog
	   :model-value="VisibleBig"
	   :modal="false"
	   :draggable="true"
	   width="40%" 
	   @close="VisibleBig=false"
	   style="border-radius: 10px;
		height: 50%;
		background-color:rgb(100,100,100,.2);"
	 >
	 <echartsStep class="main_three"  :option="bigoptiop"/>
	 </el-dialog>
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
		ref,onMounted,getCurrentInstance,nextTick
	} from 'vue'
	import { useStore } from 'vuex' // 引入useStore 方法
	const store = useStore()  // 该方法用于返回store 实例
	const optionEcharts = store.state.optionEcharts
		const {proxy} = getCurrentInstance()
		const data ={
			name:"默认模板",
			remarks:"备注",
			radio:2,
			optiop:[
			{
				type: 0,
				XData: [
					"1",
					"2",
					"3",
					"4",
					"5",
					"6",
					"7"
				],
				YData: [
					23,
					24,
					18,
					25,
					27,
					28,
					25
				]
			},
			{
				type: 1,
				XData: [
					"1",
					"2",
					"3",
					"4",
					"5",
					"6",
					"7"
				],
				YData: [
					5,
					10,
					30,
					15,
					20,
					5,
					20
				]
			},
			{
				type: 2,
				XData: [
					"1",
					"2",
					"3",
					"4",
					"5",
				],
				YData: [
					50,
					20,
					30,
					20,
					40
				]
			},
			{
				type: 3,
				XData: [
					"1",
					"2",
					"3",
					"4",
					"5"
				],
				YData: [
					20,
					40,
					60,
					80,
					100
				]
			},
			{
				type: 1,
				XData: [
					"1",
					"2",
					"3",
					"4",
					"5"
				],
				YData: [
					20,
					40,
					60,
					80,
					100
				]
			},
			{
				type: 4,
				XData: [
					"1",
					"2",
					"3",
					"4",
					"5"
				],
				YData: [
					20,
					40,
					60,
					80,
					100
				]
			},
			{
				type: 5,
				XData: [
					"1",
					"2",
					"3",
					"4",
					"5"
				],
				YData: [
					20,
					40,
					60,
					80,
					100
				]
			},
		]}
		
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
	}
	// 删除弹框取消按钮
	const cancelDelete = (flag) => {
		dialogVisibleDelete.value = flag.value
	}
	// 当前模板次序
	// 打开切换按钮 获取模板列表数据
	const res={
	    "code": 200,
	    "data": {
	        "namelist": [
	            {
	                "id": 1,
	                "name": "默认模板"
	            },
	            {
	                "id": 2,
	                "name": "模板A"
	            },
	            {
	                "id": 3,
	                "name": "模板B"
	            },
	            {
	                "id": 4,
	                "name": "模板C"
	            },
	        ]
	    }
	}
	const SwitchChange = async() => {
		// const {data: res} = await proxy.$http.Exhibition.getList()
		// if (res.code !== 200) return proxy.$message.error('获取数据失败')
		
		radioList.value=[]
		for (let i in res.data.namelist) {
			const obj={label:res.data.namelist[i].id,value:res.data.namelist[i].name}
			radioList.value.push(obj)
		}
		dialogVisibleSwitch.value=true
		
	}
	// 切换弹框确定按钮
	const determineSwitch = (flag) => {
		dialogVisibleSwitch.value = flag.value
		let id=radio.value
		getData()
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
		getData()
	}
	// 添加模板完成按钮 
	const complete=(mas)=>{
		console.log(mas);
		VisibleAdd.value=false
		 getData();
	}
	onMounted(() => {
	  getData();
	});
	// const tempId=ref(1)
	// 显示模板数据表单
	const form=ref({})
	// console.log(proxy.$method.write.echartsShow(data.optiop));
	data.optiop=proxy.$method.write.echartsShow(data.optiop)
	const getData= ()=>{
		// const {data: res} = await proxy.$http.Exhibition.getData({id})
		// if (res.code !== 200) return proxy.$message.error('获取数据失败')
		form.value=data
		form.value.radio=radio.value-1
	}
	// 点击各个模块
	const bigoptiop=ref([])
	const clog=(index)=>{
		VisibleBig.value=true
		 // nextTick(() => {
			 bigoptiop.value=form.value.optiop[index]
		// })
		// nextTick(() => {
		// 	 bigoptiop.value=form.value.optiop[index]
		// 	})
	}
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
				width: 60%;
				height: 100%;
				padding-top: 0.4rem;
				padding-left: 3rem;
				padding-right: 1rem;
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
