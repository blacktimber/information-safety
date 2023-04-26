// 数据源界面接口
import request from "./request";

// 分页展示报警信息
export function getPolice() {
    return request({
        url: `/zeroTrust/warning/management/search`,
        method: "get",
    });
}
// 删除报警信息
export function deletePolice(params) {
    return request({
        url: `/zeroTrust/warning/management/eliminate`,
        method: "get",
		params
    });
}