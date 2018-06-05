import { Component, Emit, Vue } from 'vue-property-decorator';
import { Mixins } from '../../mixins/base';
import { ProxyMixin } from '../../mixins/proxy';
import { Logger } from '../../util/log';
import { LoggerMixin } from './../../mixins/logger';

@Component({
  template: require('./about.html'),
  components: {

  }
})
export class AboutComponent extends Mixins(LoggerMixin, ProxyMixin) {

  public repo: string = 'https://github.com/ducksoupdev/vue-webpack-typescript';
  // protected logger: Logger;

  public mounted() {
    // if (!this.logger) {
    //   this.logger = new Logger();
    // }
    this.$nextTick(() => this.logger.info('about is ready!'));

    this.logger.warn('cc','测测');
    
  }
}
