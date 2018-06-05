import { Logger } from './../util/log';

import { Component, Vue } from "vue-property-decorator";

/**
 * Mixin Proxy
 * 用于接口的混入
 * @export
 * @class ProxyMixin
 * @extends {Vue}
 */
@Component({})
export class LoggerMixin extends Vue {
  public logger: Logger = new Logger();
}
