// 数据源界面接口
import request from "./request";

// 分页展示ip源数据
export function getAuth(params) {
    return request({
        url: `/admin/login/auth`,
        method: "get",
		params
    });
}
