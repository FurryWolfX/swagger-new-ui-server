/**
 * router/index.js 是默认会被加载的第一个路由，这里面可以处理权限拦截等操作
 */
import server from "../server";
import { LRequest, RouterClass, RouterMapper, Server } from "@wolfx/lightning";
import axios from "axios";

@RouterClass()
class DemoRouter {
  @RouterMapper(server, Server.GET, "/getData")
  async getData(req: LRequest) {
    const url: string = req.query.url as string;
    const swaggerUrl = url + "/v2/api-docs";
    const res = await axios.get(swaggerUrl, {
      responseType: "json"
    });
    if (res.status === 200) {
      return {
        code: 200,
        data: res.data
      };
    } else {
      return {
        code: 500,
        data: null
      };
    }
  }
}
