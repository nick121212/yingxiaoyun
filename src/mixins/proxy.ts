import { ModelProxy } from "modelproxy";
import { IExecute } from "modelproxy/out/models/execute";
import { Component, Vue } from "vue-property-decorator";

import { getInterfaceConfig, proxy as proxyInstance } from "../modelproxy";

/**
 * Mixin Proxy
 * 用于接口的混入
 * @export
 * @class ProxyMixin
 * @extends {Vue}
 */
@Component({})
export class ProxyMixin extends Vue {
  public proxy: ModelProxy = proxyInstance;
  public loading: boolean = false;

  constructor() {
    super();
    const { proxy } = this;
    const originExecute = proxy.execute.bind(proxy);
    const originLoadConfig = proxy.loadConfig.bind(proxy);

    // 发起请求的时候，做一下判断，如果没有加载相对应的接口配置文件，则加载。
    proxy.execute = async (ns: string, key: string, options: IExecute, ...otherOptions: any[]): Promise<any> => {
      try {
        proxy.getNs(ns);
      } catch{
        await getInterfaceConfig.get(ns + ".json", {
          settings: {
            cache: true
          }
        }).then(originLoadConfig);
      }

      return originExecute(ns, key, options, otherOptions);
    };
  }

  public async execute(ns: string, key: string, params: IExecute): Promise<any> {
    let data;

    this.loading = true;
    try {
      data = await this.proxy.execute(ns, key, params);
    } finally {
      this.loading = false;
    }

    return data;
  }
}
