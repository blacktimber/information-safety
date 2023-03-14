// 数据源界面接口
import request from "@/service/request";
// 获取正则
export function getReg(data) {
    return request({
        url: `/regular/select`,
        method: "POST",
        data
    });
}
// 测试正则
export function testReg(data) {
    return request({
        url: `/regular/matching`,
        method: "POST",
        data
    });
}
// 添加正则
export function addReg(data) {
    return request({
        url: `/regular/update`,
        method: "POST",
        data
    });
}
// 获取所有正则及其分段结果
export function getAllSubReg(data) {
    return request({
        url: `/regular/toLoad`,
        method: "POST",
        data
    });
}
