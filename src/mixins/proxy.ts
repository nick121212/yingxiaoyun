import { ModelProxy } from "modelproxy";
import { IExecute } from "modelproxy/out/models/execute";
import { Component, Vue } from "vue-property-decorator";

import { getInterfaceConfig, proxy } from "../modelproxy";

/**
 * Mixin Proxy
 * 用于接口的混入
 * @export
 * @class ProxyMixin
 * @extends {Vue}
 */
@Component({})
export class ProxyMixin extends Vue {
  public proxy: ModelProxy = proxy;

  constructor() {
    super();

    const originExecute = this.proxy.execute.bind(this.proxy);
    const originLoadConfig = this.proxy.loadConfig.bind(this.proxy);

    this.proxy.execute = async (ns: string, key: string, options: IExecute, ...otherOptions: any[]): Promise<any> => {
      try {
        this.proxy.getNs(ns);
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

  public execute(ns: string, key: string, params: IExecute): Promise<any> {
    return this.proxy.execute(ns, key, params);
  }
}
