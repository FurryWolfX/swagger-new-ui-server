import logger from "log-utils";
import { createRouter } from "pre-build/createRouter";
import server from "./server";
import * as path from "path";

const routerSrc = path.resolve(__dirname, "./router");
const routerManifest = path.resolve(__dirname, "../.lightning/router-manifest");
createRouter(routerSrc)
  .then(() => import(routerManifest))
  .then(() => server.start());

logger.info(`[Worker Process:${process.pid}] started`);

// 每分钟输出一次内存
// setInterval(() => {
//   const mString = Math.floor(process.memoryUsage().rss / 1024 / 1024) + "MB";
//   logger.info(`[Worker:${process.pid} -> memory use] ${mString}`);
// }, 1000 * 60);

// error handler
process.on("uncaughtException", error => {
  logger.error(error.stack);
});
