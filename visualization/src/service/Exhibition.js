// 数据源界面接口
import request from "@/service/request";
//获取数据源列表
export function getLabels() {
    return request({
        url: `/com/yywl/fac`,
        method: "get",
    });
}
//远程调用-获取日志表结构信息，不要参数
export function getOlist() {
    return request({
        url: `/strategy/consumer/desc`,
        method: "POST",
    });
}

// 分页展示策略信息
export function getLog(data) {
    return request({
        url: `/strategy/page`,
        method: "POST",
        data
    });
}

// 策略添加
export function addLog(data) {
    return request({
        url: `/strategy/insert`,
        method: "POST",
        data
    });
}

// 确认修改时调用，参数传输修改体
export function getLogChange(data) {
    return request({
        url: `/strategy/updateById`,
        method: "POST",
        data
    });
}

// 修改前获取本行信息需要本行id
export function changeLog(params) {
    return request({
        url: `/strategy/findId`,
        method: "GET",
        params
    });
}

// 删除本行信息需要本行id(参数名：item)
export function deleteLog(params) {
    return request({
        url: `/strategy/deleteById`,
        method: "GET",
        params
    });
}
// 策略查询数据分页最大值
export function selectTotal(params) {
    return request({
        url: `/strategy/searchDataMax`,
        method: "GET",
        params
    });
}
// 引擎拿到策略值，去匹配数据
export function selectLog(params) {
    return request({
        url: `/com/yywl/engine/prodRedis`,
        method: "GET",
        params
    });
}
export function redis() {
    return request({
        url: `/com/yywl/engine/redis`,
        method: "GET",
    });
}
//查询缓存，策略匹配数据
export function getlogtable(params) {
    return request({
        url: `/com/yywl/redis/find`,
        method: "GET",
        params
    });
}


