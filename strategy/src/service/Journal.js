// 数据源界面接口
import request from "@/service/request";
// 获取引擎日志列表
export function getLog(params) {
    return request({
        url: `/com/yywl/download/searchFile`,
        method: "GET",
        params
    });
}
// 下载日志
export function downLog(params) {
    return request({
        url: `/com/yywl/download/log`,
        method: "GET",
        params
    });
}
// 获取总页数
export function gettotal() {
    return request({
        url: `/com/yywl/download/searchFileMax`,
        method: "GET",
    });
}

