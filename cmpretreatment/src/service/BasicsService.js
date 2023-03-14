// 数据源界面接口
import request from "@/service/request";
// 获取数据源列表
export function getOlist() {
    return request({
        url: `/facility/yyfName`,
        method: "GET"
    });
}
// 获取日志原文列表
export function getLog(data) {
    return request({
        url: `/log/yysDate`,
        method: "POST",
        data
    });
}
