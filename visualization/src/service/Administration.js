// 数据源界面接口
import request from "@/service/request";
//获取当前可视化数据
export function getData() {
    return request({
        url: `/administration/show`,
        method: "get",
    });
}
//测试
export function getaaa() {
    return request({
        url: `/administration/see`,
        method: "get",
    });
}
