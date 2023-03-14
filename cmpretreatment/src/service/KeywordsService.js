// 数据源界面接口
import request from "@/service/request";
// 获取处理后数据源词汇列表
export function getAllWords(data) {
    return request({
        url: `/msg/page`,
        method: "POST",
        data
    });
}
// 删除数据源词汇
export function deleteAllWords(params) {
    return request({
        url: `/msg/delete`,
        method: "POST",
        params
    });
}
