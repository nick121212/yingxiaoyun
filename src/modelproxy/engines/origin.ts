import { FetchEngine } from "modelproxy-engine-fetch";
import { IProxyCtx } from "modelproxy/out/models/proxyctx";

/**
 * 返回fetch的返回值，不错任何处理
 */
const engine = new FetchEngine();

engine.init();

/**
 * 验证返回状态码
 * 如果有错误，则抛出错误信息
 */
engine.use(async (ctx: IProxyCtx, next: (symbol?: string) => Promise<void>) => {
  if (!ctx.result.ok || ctx.result.status !== 200) {
    throw new Error(await ctx.result.statusText);
  }

  await next();
});

/**
 * 数据转换成json
 */
engine.use(async (ctx: IProxyCtx, next: (symbol?: string) => Promise<void>) => {
  ctx.result = ctx.result.clone();

  await next();
});

export default { origin: engine };
