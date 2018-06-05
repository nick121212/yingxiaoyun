import { ModelProxy } from "modelproxy";
import { FetchEngine } from "modelproxy-engine-fetch";
import { IProxyCtx } from "modelproxy/out/models/proxyctx";


export default (proxy: ModelProxy) => {
  const engine = new FetchEngine();

  // engine.use(async (ctx: IProxyCtx, next: (symbol?: string) => Promise<void>) => {

  //   if (!proxy.getNs(ctx.instance.ns)) {
  //     await proxy.getNs("json").get("interfacees").get(ctx.instance.ns).then(console.log);
  //   }

  //   await next();
  // });

  /**
   * 验证返回状态码
   * 如果有错误，则抛出错误信息
   */
  engine.use(async (ctx: IProxyCtx, next: (symbol?: string) => Promise<void>) => {
    ctx.executeInfo.instance = Object.assign({}, ctx.executeInfo.instance || {}, {
      engine: "origin"
    });

    ctx.result = await proxy.execute(ctx.instance.ns, ctx.instance.key, ctx.executeInfo);

    await next();
  });

  /**
   * 数据转换成json
   */
  engine.use(async (ctx: IProxyCtx, next: (symbol?: string) => Promise<void>) => {
    ctx.result = ctx.result.clone();
    ctx.result = await ctx.result.json();

    await next();
  });

  return { json: engine };
};
