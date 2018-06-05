import { FetchEngine } from "modelproxy-engine-fetch";
import { IProxyCtx } from "modelproxy/out/models/proxyctx";

// 定义一个获取本地文件的调用方式
const engine = new FetchEngine();

engine.init();
engine.use(async (ctx: IProxyCtx, next: (symbol?: string) => Promise<void>) => {
  if (!ctx.result.ok || ctx.result.status !== 200) {
    throw new Error(ctx.result.statusText);
  }

  ctx.result = await ctx.result.clone();
  ctx.result = await ctx.result.json();

  await next();
});

export default {
  local: engine
};
