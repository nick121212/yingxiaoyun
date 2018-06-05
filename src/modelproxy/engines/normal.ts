import { ModelProxy } from "modelproxy";
import { FetchEngine } from "modelproxy-engine-fetch";
import { IProxyCtx } from "modelproxy/out/models/proxyctx";


export default (proxy: ModelProxy) => {
  const engine = new FetchEngine();

  /**
   * 验证返回状态码
   * 如果有错误，则抛出错误信息
   */
  engine.use(async (ctx: IProxyCtx, next: (symbol?: string) => Promise<void>) => {
    ctx.executeInfo.instance = Object.assign({}, ctx.executeInfo.instance || {}, {
      engine: "json"
    });

    ctx.result = await proxy.execute(ctx.instance.ns, ctx.instance.key, ctx.executeInfo);

    await next();
  });

  /**
   * 判断与服务器端约定的错误格式
   * 如果code！=000000则抛出异常
   */
  engine.use(async (ctx: IProxyCtx, next: (symbol?: string) => Promise<void>) => {
    if (ctx.result.code !== "000000") {
      throw new Error(ctx.result.message);
    }

    ctx.result = ctx.result.data;

    await next();
  });

  return { normal: engine };
};
