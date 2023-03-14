// 数据源界面接口
import request from "@/service/request";
// 获取数据源初始数据
export function getOrginLog() {
    return request({
        url: `/log/select/insert`,
        method: "GET"
    });
}

// 获取数据源数据
export function getLog(data) {
    return request({
        url: `/facility/page`,
        method: "POST",
        data
    });
}

// 增加数据源数据
export function addLog(data) {
    return request({
        url: `/facility/insert`,
        method: "POST",
        data
    });
}

// 获取数据源原来信息以修改
export function getLogChange(params) {
    return request({
        url: `/facility/byId`,
        method: "GET",
        params
    });
}

// 修改数据源数据
export function changeLog(data) {
    return request({
        url: `/facility/update`,
        method: "POST",
        data
    });
}

// 删除数据源数据
export function deleteLog(params) {
    return request({
        url: `/facility/delete`,
        method: "GET",
        params
    });
}
