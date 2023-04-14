// 数据源界面接口
import request from "@/service/request";

// 获取模板
export function getType(params) {
    return request({
        url: `/com/yywl/charts/getModel`,
        method: "get",
		params
    });
}
// 获取所有模板
export function getModelList() {
    return request({
        url: `/com/yywl/charts/getModelList`,
        method: "get",
    });
}
// 添加模板
export function AddType(data) {
    return request({
        url: `/com/yywl/charts/addModel`,
        method: "post",
		data
    });
}
// 删除模板
export function DeleteType(params) {
    return request({
        url: `/com/yywl/charts/deleteModel`,
        method: "get",
		params
    });
}
// 修改模板
export function EditType(data) {
    return request({
        url: `/com/yywl/charts/updateModel`,
        method: "post",
		data
    });
}
//默认数据
export function getData() {
    return request({
        url: `/com/yywl/charts/getGarden`,
        method: "get",
    });
}
//点击第一层数据
export function getList(params) {
    return request({
        url: `/com/yywl/charts/getDigDeeply`,
        method: "get",
		params
    });
}
//点击第二层数据
export function getOPrg(params) {
    return request({
        url: `/com/yywl/charts/getDigDeeplySources`,
        method: "get",
		params
    });
}

