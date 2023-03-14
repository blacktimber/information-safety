// 数据源界面接口
import request from "@/service/request";
// 获取数据源词汇列表
export function getAllWords(data) {
    return request({
        url: `/msg/dispose`,
        method: "POST",
        data
    });
}
// 提交数据源词汇分类列表
export function postAllWords(data) {
    return request({
        url: `/msg/insert`,
        method: "POST",
        data
    });
}
