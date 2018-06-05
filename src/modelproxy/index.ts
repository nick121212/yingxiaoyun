import { ModelProxy } from "modelproxy";
import { FetchEngine } from "modelproxy-engine-fetch";
import { IProxyCtx } from "modelproxy/out/models/proxyctx";

export const proxy = new ModelProxy;

const engine = new FetchEngine();
const engine1 = new FetchEngine();

engine1.init();
engine.init();

engine.use(async (ctx: IProxyCtx, next: (symbol?: string) => Promise<void>) => {
    if (!ctx.result.ok || ctx.result.status!==200){
        throw new Error(ctx.result.text);
    }

    await next();
});
engine.use(async (ctx: IProxyCtx, next: (symbol?: string) => Promise<void>) => {
    ctx.result = ctx.result.clone();
    ctx.result = await ctx.result.json();

    await next();
});

engine.use(async (ctx: IProxyCtx, next: (symbol?: string) => Promise<void>) => {
    if(ctx.result.code!=="000000"){
        throw new Error(ctx.result.message);
    }

    ctx.result = ctx.result.data;

    await next();
});

proxy.loadConfig({
    "key": "tvmaze",
    "title": "p-uc",
    "engine": "fetch",
    "mockDir": "/mocks/",
    "states": {
        "prod": "http://api.tvmaze.com",
        "test": "http://api.tvmaze.com",
        "dev": "/search",
        "stag": "http://api.tvmaze.com"
    },
    "state": "dev",
    "interfaces": [{
        "engine":"fetch1",
        "key": "search.shows",
        "title": "搜索所有的电影数据",
        "method": "GET",
        "path": "/shows"
    }, {
        "engine": "fetch1",
        "key": "search.shows1",
        "title": "搜索所有的电影数据",
        "method": "GET",
        "path": "/shows"
    }]
}, {
  
});

proxy.addEngines({
    fetch: engine,
    fetch1: engine1
});
