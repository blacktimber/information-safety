"use strict";(self["webpackChunkyy_shop"]=self["webpackChunkyy_shop"]||[]).push([[258],{87258:function(e,t,a){a.r(t),a.d(t,{default:function(){return p}});a(57658);var r=a(66252),o=a(3577),l=a(22201),n=a(2262);const i={class:"title"};var s={__name:"DetailView",setup(e){const t=(0,l.yj)(),{proxy:a}=(0,r.FN)(),s=(0,n.reactive)({item:t.query.item,facility:t.query.yyrFacility||t.query.facility,host:t.query.yyrHost||t.query.host,currentPage:1,pageSize:15});(0,r.bv)((()=>{d()}));const c=()=>({"font-size":"0.18rem",color:"black","text-align":"center","font-weight":"bolder",border:"1px soild black"}),u=()=>({"text-align":"center",color:"black","font-size":"0.15rem",height:"0.6rem"}),p=e=>{if(e.rowIndex%2!==0)return{backgroundColor:"#F5F5F5"}},y=(0,n.reactive)([]),g=(0,n.ref)(0),d=async()=>{const{data:e}=await a.$http.BasicsService.getLog(s);if(200!==e.code)return a.$message.error("获取日志原文信息失败");console.log(e.data.records),y.length=0;for(let t=0;t<e.data.records.length;t++)y.push(e.data.records[t]);g.value=e.data.total},h=e=>{s.currentPage=e,d()};return(e,t)=>{const a=(0,r.up)("el-table-column"),l=(0,r.up)("el-table"),n=(0,r.up)("el-pagination");return(0,r.wg)(),(0,r.iD)("div",null,[(0,r._)("div",i,"【"+(0,o.toDisplayString)(s.item)+"】关联日志原文",1),(0,r.Wm)(l,{data:y,style:{width:"90%",margin:"45px auto"},"row-style":p,"header-cell-style":c,"cell-style":u},{default:(0,r.w5)((()=>[(0,r.Wm)(a,{prop:"yysHost",label:"I P","min-width":"200"}),(0,r.Wm)(a,{prop:"yysMsg",label:"日 志 原 文","min-width":"600","show-overflow-tooltip":!0}),(0,r.Wm)(a,{prop:"yysLevel",label:"预 警 级 别"})])),_:1},8,["data"]),(0,r.Wm)(n,{onCurrentChange:h,background:"",layout:"prev, pager, next",total:g.value,"current-page":s.currentPage,"page-size":s.pageSize,class:"pagination-container"},null,8,["total","current-page","page-size"])])}}},c=a(83744);const u=(0,c.Z)(s,[["__scopeId","data-v-835ae152"]]);var p=u}}]);
//# sourceMappingURL=258.3175ead2.js.map