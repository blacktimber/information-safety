import { createStore } from 'vuex'
// 类似 Redux 中的建立状态树

export default createStore({
  
  // 1、 存储所有全局数据
  state: {
    optionEcharts :[
		// 折线图
		{
			 // color: ["#ed3f35"],
			 tooltip: {
			   trigger: "axis"
			 },
			 legend: {
			   // 如果series 对象有name 值，则 legend可以不用写data
			   // 修改图例组件 文字颜色
			   textStyle: {
			     color: "#4c9bfd"
			   },
			   // 这个10% 必须加引号
			   right: "10%"
			 },
			grid: {
			  top: "5%",
			  left: "3%",
			  right: "4%",
			  bottom: "3%",
			  // show: true, // 显示边框
			  borderColor: "#012f4a", // 边框颜色
			  containLabel: true // 包含刻度文字在内
			},
    		xAxis: {
    			type: 'category',
				boundaryGap: false,
    			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				// axisTick: {
				//   show: false // 去除刻度线
				// },
				axisLabel: {
				  color: "rgba(0,0,0,.8)",
				  fontSize: "12",
				  interval: 0,
				  rotate: 20
				},
				// axisLine: {
				//   show: false // 去除轴线
				// }
    		},
    		yAxis: {
    			type: "value",
    			// axisTick: {
    			//   show: false // 去除刻度线
    			// },
    			// axisLabel: {
    			//   color: "#4c9bfd" // 文本颜色
    			// },
    			// axisLine: {
    			//   show: false // 去除轴线
    			// },
    			// splitLine: {
    			//   lineStyle: {
    			//     color: "#012f4a" // 分割线颜色
    			//   }
    			// }
    		},
    		series: [{
				// smooth: true,
    			data: [150, 230, 224, 218, 135, 147, 260],
    			type: 'line'
    		}]
    	},
    	// 柱形图
		{
			tooltip: {
			  trigger: "axis",
			  axisPointer: {
			    // 坐标轴指示器，坐标轴触发有效
			    type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
			  }
			},
			grid: {
			  left: "5%",
			  top: "5%",
			  right: "5%",
			  bottom: "4%",
			  containLabel: true
			},
    		xAxis: {
    	 	type: 'category',
    		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			axisTick: {
			  alignWithLabel: true
			},
			axisLabel: {
			  color: "rgba(0,0,0,.8)",
			  fontSize: "12",
			  interval: 0,
			  rotate: 20
			},
    		},
    		yAxis: {
    			type: 'value'
    		},
    		series: [{
    			data: [120, 200, 150, 80, 70, 110, 130],
    			type: 'bar',
    			showBackground: true,
    			backgroundStyle: {
    				color: 'rgba(180, 180, 180, 0.2)'
    			},
				barWidth: '30%',
				itemStyle: {
					// 修改柱子圆角
				borderRadius : 2
				}
    	 }]
    	},
		// 饼图
		 {
		  title: {
		    text: '',
		    subtext: '',
		    left: 'center'
		  },
		  tooltip: {
		    trigger: 'item'
		  },
		  legend: {
		   top: '2%',
				left: 'center',
				// orient: 'vertical',
		  },
		  series: [
		    {
		      name: 'Access From',
		      type: 'pie',
		      radius: '50%',
			  // 不显示标签文字
			  label: {
			  	show: false
			  },
			  // 不显示连接线
			  labelLine: {
			  	show: false
			  },
		      data: [
		        { value: 1048, name: 'Search Engine' },
		        { value: 735, name: 'Direct' },
		        { value: 580, name: 'Email' },
		        { value: 484, name: 'Union Ads' },
		        { value: 300, name: 'Video Ads' }
		      ],
		      emphasis: {
		        itemStyle: {
		          shadowBlur: 10,
		          shadowOffsetX: 0,
		          shadowColor: 'rgba(0, 0, 0, 0.5)'
		        }
		      }
		    }
		  ]
		},
    	
		
		// 面积折线图
		{
			tooltip: {
			   trigger: "axis"
			 },
			 legend: {
			   // 如果series 对象有name 值，则 legend可以不用写data
			   // 修改图例组件 文字颜色
			   textStyle: {
			     color: "#4c9bfd"
			   },
			   // 这个10% 必须加引号
			   right: "10%"
			 },
			grid: {
			  top: "5%",
			  left: "3%",
			  right: "4%",
			  bottom: "3%",
			  // show: true, // 显示边框
			  borderColor: "#012f4a", // 边框颜色
			  containLabel: true // 包含刻度文字在内
			},
		  xAxis: {
		    type: 'category',
		    boundaryGap: false,
		    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			axisLabel: {
			  color: "rgba(0,0,0,.8)",
			  fontSize: "12",
			  interval: 0,
			  rotate: 20
			},
		  },
		  yAxis: {
		    type: 'value'
		  },
		  series: [
		    {
		      data: [820, 932, 901, 934, 1290, 1330, 1320],
		      type: 'line',
		      areaStyle: {}
		    }
		  ]
		},
		// 横向柱状图+
		{
		  title: {
		    text: ''
		  },
		  tooltip: {
		    trigger: 'axis',
		    axisPointer: {
		      type: 'shadow'
		    }
		  },
		  legend: {},
		  grid: {
		    left: '3%',
		    right: '4%',
		    bottom: '3%',
		    containLabel: true
		  },
		  xAxis: {
		    type: 'value',
		    boundaryGap: [0, 0.01],
			axisLabel: {
			  color: "rgba(0,0,0,.8)",
			  fontSize: "12",
			  interval: 0,
			  rotate: 20
			},
		  },
		  yAxis: {
		    type: 'category',
		    data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
			
		  },
		  series: [
		    {
		      // name: '2011',
		      type: 'bar',
		      data: [18203, 23489, 29034, 104970, 131744, 630230]
		    },
		  ]
		},
		// 环图
		{
		  tooltip: {
		    trigger: 'item'
		  },
		  legend: {
		    top: '2%',
		    left: 'center',
			// orient: 'vertical',
		  },
		  series: [
		    {
		      name: '',
		      type: 'pie',
			  center: ["50%", "50%"],
		      radius: ['40%', '60%'],
		      avoidLabelOverlap: false,
		      itemStyle: {
		        borderRadius: 10,
		        borderColor: '#fff',
		        borderWidth: 2
		      },
		      label: {
		        show: false,
		        position: 'center'
		      },
		      emphasis: {
		        label: {
		          show: true,
		          fontSize: 40,
		          fontWeight: 'bold'
		        }
		      },
		      labelLine: {
		        show: false
		      },
		      data: [
		        { value: 1048, name: 'Search Engine' },
		        { value: 735, name: 'Direct' },
		        { value: 580, name: 'Email' },
		        { value: 484, name: 'Union Ads' },
		        { value: 300, name: 'Video Ads' }
		      ]
		    }
		  ]
		},
		
    ]
  },
 
  // 2、 需要通过计算获取state里的内容获取的数据
  // 只能读取不可修改
  getters: {
    
  },
 
  //  3、定义对state的各种操作
  // why不直接实现在mutation里需要写到action里?
  // mtations不能执行异步操作。aq:从云端获取信息-->(等待云端反馈)更新到state异步操作
  // 因此说:对于异步操作需要放到action里，简单的直接赋值操作可以直接放到mutation里
  mutations: {
  },

  // 3、定义对state的各种操作
  // actions无法直接修改state，需要在mutations里更新
  // mutation不支持异步，所以需要在action里写api到url
  actions: {
      // 比说action定义了更新state的操作
      // 但是不可对其直接修改
      // 所有的修改操作必须放到mutations里
  },
})

