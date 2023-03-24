<template>
	<div>
	<el-steps :active="active"  finish-status="success" simple style="padding-top: 20px">
	    <el-step title="模板名称" @click="active=0">
		</el-step>
	    <el-step title="模板格式" @click="active=1"></el-step>
	    <el-step title="模板可视化" @click="active=2"></el-step>
	  </el-steps>
	  <div class="step_main" >
		  <div class="main_first" v-if="active==0">
			  <div style="margin-bottom: 0.3rem;">
			  	<span>模 板 名 字 </span>
			  	<el-input class="text-center" v-model="form.name"  style="width:6.48rem; margin-left: 0.2rem"></el-input>
			  	</div>
			  	<div>
			  	<span>模 板 备 注 </span>
			  	<el-input class="text-center" v-model="form.remarks" style="width:6.48rem; margin-left: 0.2rem;"></el-input>
			  	</div>
		  </div>
		  <div class="main_second" v-if="active==1">
			 <el-radio-group v-model="form.radio" text-color="#ffffff" fill="#ffffff">
			 	<el-radio :label="0">
					<div class="radio_div">
						<showBody/>
					</div>
				</el-radio>
			 	<el-radio :label="1">
					<div class="radio_div" >
						<custom/>
					</div>
				</el-radio>
			 	<el-radio :label="2">
					<div class="radio_div">
						<custom2/>
					</div>
				</el-radio>
				<el-radio :label="3">
					<div class="radio_div" style="">
						<custom3 />
					</div>
				</el-radio>
			 </el-radio-group>
		  </div>
		  <div class="main_third" v-if="active==2">
		  		<div class="add" v-if="form.radio==0">
		  			<showBody >
		  				<template v-for="item of 7" :key="item" v-slot:[item] >
		  					<span v-if="!showflag[item]" class="addSpan"  @click="add(item)" >+</span>
							<echartsStep v-if="showflag[item]"  :option="form.optiop[item]" />
		  				</template>
		  			</showBody>
		  		</div>
				<div class="add" v-if="form.radio==1" >
					<custom >
						<template v-for="item of 4" :key="item" v-slot:[item]>
							<span v-if="!showflag[item]" class="addSpan"  @click="add(item)" >+</span>
							<echartsStep v-if="showflag[item]" :option="form.optiop[item]" />
						</template>
					</custom>
				</div>
				<div class="add" v-if="form.radio==2">
					<custom2 >
						<template v-for="item of 6" :key="item" v-slot:[item]>
							<span v-if="!showflag[item]" class="addSpan"  @click="add(item)" >+</span>
							<echartsStep v-if="showflag[item]"  :option="form.optiop[item]" />
						</template>
					</custom2>
				</div>
				<div class="add" v-if="form.radio==3">
					<custom3 >
						<template v-for="item of 7" :key="item" v-slot:[item]>
							<span v-if="!showflag[item]" class="addSpan"  @click="add(item)" >+</span>
							<echartsStep v-if="showflag[item]"  :option="form.optiop[item]" />
						</template>
					</custom3>
				</div>
		  </div>
		  <div class='item_button'>
		  	<span class="dialog-footer">
		  		<el-button @click="goOut">取 消</el-button>
		  		<el-button type="primary" v-if="active!=2"  @click="AddReg">下一步</el-button>
				<el-button type="primary" v-else  @click="complete">完成</el-button>
		  	</span>
		  </div>
	  </div>
	  </div>
	  <el-dialog
	    :model-value="VisibleAdd"
	    :close-on-click-modal="false"
	    width="70%"
	    @close="VisibleAdd=false"
	    style="border-radius: 10px;height: 70%;"
	  >
	    <el-scrollbar height="5.5rem">
	     
	 <div class="main_three">
	 	<el-radio-group v-model="radioAdd" text-color="#ffffff" fill="#ffffff">
	 		<el-radio :label="index" v-for="(item,index) in optionEcharts" :key="index">
	 			<echartsStep  :option="item" />
	 		</el-radio>
			<!-- <el-radio class="radio_sss">
				
			</el-radio> -->
	 	</el-radio-group>
	 </div>
	 </el-scrollbar>
	  <div class="item_button">
	    <span class="dialog-footer">
	      <el-button @click="cancelAdd">取 消</el-button>
	      <el-button type="primary" @click="determineAdd">确 定</el-button>
	    </span>
	  </div>
	  </el-dialog>
</template>

<script setup>
	import showBody from '@/components/Template/show.vue'
	import Dialog from '@/components/dialog.vue'
	import custom from '@/components/Template/custom.vue'
	import custom2 from '@/components/Template/custom2.vue'
	import custom3 from '@/components/Template/custom3.vue'
	import echartsStep from '@/components/echartsStep.vue'
	import {ref,defineEmits,defineProps,toRefs,onMounted,getCurrentInstance,nextTick } from 'vue'
	import { useStore } from 'vuex' // 引入useStore 方法
	const store = useStore()
	const {proxy} = getCurrentInstance()
	const props = defineProps({
		//子组件接收父组件传递过来的值
		formss:Object,
		visible:Boolean
	})
	//使用父组件传递过来的值
	const {
		formss,visible
	} = toRefs(props)
	onMounted(() => {
	  if(visible.value==false){
		  form.value={}
	  }else{
		  form.value=formss.value
		  form.value.optiop=[]
	  }
	 
	});
	const form=ref({})
	// 选项卡的顺序
	const active=ref(0)
	// 添加可视化的对话框控制
	const VisibleAdd=ref(false)
	// 添加可视化的radio的顺序
	const radioAdd=ref(0)
	// 模板数据表单
	// 模板中 + 与图表显示控制
	const showflag=ref({})
	const optionEcharts= ref([])
	// 下一步
	form.value.optiop= new Array()
	const AddReg=()=>{
			active.value=active.value+1
			if(active.value==2){
				let i=0
				if(form.value.radio==0) i=7
				else if(form.value.radio==1) i=4
				else if(form.value.radio==2) i=6
				else if(form.value.radio==3) i=5
				showflag.value={}
				// form.value.optiop.length=i-1
				type.value.length=i-1
				for(let j=0; j<i;j++){
					showflag.value[j]=false
				}
			}
	}
	const emit = defineEmits(['goOut','complete'])
	// 取消按钮
	const goOut=()=>{
		emit('goOut')
	}
	// 完成按钮提交表单信息
	const complete=()=>{
		
		// 添加
		const masage={
			name:form.value.name,
			remarks:form.value.remarks,
			radio:form.value.radio,
			type:type.value
		}
		emit('complete',masage)
		// if(visible.value==false){
		// 	emit('complete',masage)
		// }else{
		// 	// 修改
		// }
		
	}
	// + 按钮
	const addif=ref(0)
	const add=(it)=>{
		VisibleAdd.value = true
		addif.value=it
		nextTick(()=>{
			optionEcharts.value = store.state.optionEcharts
		})
	}
	const type=ref([])
	// 弹框确定按钮
	const determineAdd = () => {
		let index=parseInt(addif.value)
		showflag.value[index]=true
		form.value.optiop=[]
		// type.value[index-1]=radioAdd.value
		type.value.splice(index-1,0,radioAdd.value);
		// form.value.optiop.length
		// form.value.optiop.push(optionEcharts.value[radioAdd.value])
		form.value.optiop[index]=optionEcharts.value[radioAdd.value]
		VisibleAdd.value = false
		
	}
	// 添加弹框取消按钮
	const cancelAdd = () => {
		showflag.value[addif.value]=false
		VisibleAdd.value = false
	}
</script>

<style scoped lang="scss">
	.step_main{
		width: 80%;
		height:75vh;
		font-size: 0.20rem;
		font-weight: 600;
		.main_first{
			width: 100%;
			height: 70%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-left: 2rem;
		}
		.main_third{
			width: 80%;
			height: 80%;
			padding-top: 0.6rem;
			padding-left:3rem;
			.add{
				height: 100%;
				width: 80%;
				border: 1px solid #ccc;
				.show_body{
					height: 96%;
				}
				.addSpan{
					font-size: 0.5rem;
					font-weight: 400;
				}
			}
		}
		.main_second{
			/deep/.el-radio-group{
				display:flex;
				.el-radio {
					width: 35%;
					height: 2.8rem;
					margin-top: 0.5rem;
					.el-radio__label {
						width: 90%;
						height: 100%;
						color: #000 !important;
						font-size: 0.25rem;
						margin-top: 0.3rem;
						margin-left: 0.5rem;
						.radio_div{
							width: 100%;
							height: 100%;
							border: 1px solid #ccc;
						}
					
					}
				
					.el-radio__input {
						margin-bottom: px(5);
						position: absolute;
						top: 0.2rem;
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
			}
		}
	}
	.item_button {
		position: absolute;
		bottom:0.02rem;
		right: 0.5rem;
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
				margin: 0 0.2rem;
			}
	
			.el-button:hover {
				background-color: white;
				color: rgb(18, 16, 29);
				border: 1px solid black;
			}
		}
	}
	
	/deep/.el-dialog__header{
		width: 0 !important;
		margin: 0 !important;
		padding: 0 !important;
		height: 0 !important;
	}
	.el-dialog__body{
		margin: 0 !important;
		padding: 0 !important;
		height: 100% !important;
	.el-scrollbar{
		height: 100% !important;
	}
	}
		.main_three{
			/deep/.el-radio-group{
				display:flex;
				flex-direction: row;
				justify-items: left;
				.el-radio {
					width: 45% !important;
					height: 4.8rem !important;
					margin-bottom:  0.5rem;
					.el-radio__label {
						width: 90% !important;
						height: 4.8rem !important;
						min-width: 2rem !important;
						color: #000 !important;
						font-size: 0.25rem;
						.echarts{
							border: 1px solid #ccc;
							
						}
					
					}
					}
					}
					
		}
		.radio_sss{
			width: 0;
			height: 0;
			visibility: hidden;
		}
</style>