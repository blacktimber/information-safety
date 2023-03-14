// 引擎状态
import request from "@/service/request";
// 获取引擎状态表
export function getAllWords(params) {
    return request({
        url: `/com/yywl/redis/engine`,
        method: "GET",
        params
    });
}
// 修改引擎数量
export function EditAllWords(params) {
    return request({
        url: `/com/yywl/engine/update`,
        method: "GET",
        params
    });
}
