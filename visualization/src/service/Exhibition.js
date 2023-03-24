// 数据源界面接口
import request from "@/service/request";
//获取模板列表数据
export function getList() {
    return request({
        url: `/com/yywl/charts/getGarden`,
        method: "get",
    });
}
//获取当前模板
export function getData(params) {
    return request({
        url: `/com/yywl/charts/getDigDeeply`,
        method: "get",
		params
    });
}
//获取当前模板
export function getOPrg(params) {
    return request({
        url: `/com/yywl/charts/getDigDeeplySources`,
        method: "get",
		params
    });
}

