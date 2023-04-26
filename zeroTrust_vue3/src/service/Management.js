// 数据源界面接口
import request from "./request";

// 分页展示ip源数据
export function getPage(data) {
    return request({
        url: `/zeroTrust/ip/crud/entrance/page`,
        method: "post",
		data
    });
}
// 添加ip源数据
export function addPage(data) {
    return request({
        url: `/zeroTrust/ip/crud/entrance/insert`,
        method: "post",
		data
    });
}
// 修改ip源数据
export function editPage(data) {
    return request({
        url: `/zeroTrust/ip/crud/entrance/update`,
        method: "post",
		data
    });
}
// 删除ip源数据
export function deletePage(params) {
    return request({
        url: `/zeroTrust/ip/crud/entrance/delete`,
        method: "get",
		params
    });
}