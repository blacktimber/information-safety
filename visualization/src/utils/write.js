
import store from '@/store'
export function echartsShow(optiop) {
	// // console.log(optionEcharts);
	const optionEcharts=JSON.parse(JSON.stringify(store.state.optionEcharts)) 
	const form=[]
	optionEcharts[2].series[0].data=[]
	optionEcharts[3].series[0].data=[]
	for(let j=0;j<optiop.length;j++){
		// 折线图
		if(optiop[j].type==0){
			optionEcharts[0].xAxis.data=optiop[j].XData
			optionEcharts[0].series[0].data=optiop[j].YData
			form.push(optionEcharts[0])
		}
		// 柱形图
		else if(optiop[j].type==1){
			optionEcharts[1].xAxis.data=optiop[j].XData
			optionEcharts[1].series[0].data=optiop[j].YData
			form.push(optionEcharts[1])
		}
		// 饼图
		else if(optiop[j].type==2){
			for(let m=0;m<optiop[j].XData.length;m++){
				const pie={}
				pie.value=optiop[j].YData[m]
				pie.name=optiop[j].XData[m]
				optionEcharts[2].series[0].data[m]=pie
			}
			form.push(optionEcharts[2])
		}
		// 面积折线图
		else if(optiop[j].type==3){
			optionEcharts[3].xAxis.data=optiop[j].XData
			optionEcharts[3].series[0].data=optiop[j].YData
			form.push(optionEcharts[3])
		}
		// 横向柱形图
		else if(optiop[j].type==4){
			optionEcharts[4].xAxis.data=optiop[j].XData
			optionEcharts[4].series[0].data=optiop[j].YData
			form.push(optionEcharts[4])
		}
		// 环图
		else if(optiop[j].type==5){
			for(let m=0;m<optiop[j].XData.length;m++){
				const pie={}
				pie.value=optiop[j].YData[m]
				pie.name=optiop[j].XData[m]
				optionEcharts[5].series[0].data[m]=pie
			}
			form.push(optionEcharts[5])
		}
	}
	return form
}
