// 数据源界面接口
import request from "./request";
//数据源
export function getIp() {
    return request({
        url: `/strategic/com/yywl/fac`,
        method: "get",
    });
}
// 获取日志
export function getIpLog(params) {
    return request({
        url: `/zeroTrust/zero/logSources/getIP/alarmLog`,
        method: "get",
		params
    });
}