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
