import { ModelProxy } from "modelproxy";
import { IInterfaceModel } from "modelproxy/out/models/interface";

import commonConfig from "./common.json";

import json from "./engines/json";
import local from "./engines/local";
import normal from "./engines/normal";
import origin from "./engines/origin";

export const proxy = new ModelProxy;

// 加入engines
proxy
  .addEngines(normal(proxy))
  .addEngines(json(proxy))
  .addEngines(origin)
  .addEngines(local);

// 载入基础配置
proxy.loadConfig(commonConfig, {});

// 导出获取接口接口方法
export const getInterfaceConfig: IInterfaceModel = proxy.getNs("json").get("interfaces");
