import { Component, Vue, Watch } from 'vue-property-decorator';
import { Logger } from '../../util/log';
import { Link } from './link';

@Component({
  template: require('./navbar.html'),
  components: {
  }
})
export class NavbarComponent extends Vue {

  public object: { default: string } = { default: 'Default object property!' };
  public links: Link[] = [
    new Link('Home', '/'),
    new Link('About', '/about'),
    new Link('List', '/list')
  ];

  protected logger: Logger;

  @Watch('$route.path')
  public pathChanged() {
    this.logger.info('Changed current path to: ' + this.$route.path);
  }

  public mounted() {
    if (!this.logger) {
      this.logger = new Logger();
    }
    this.$nextTick(() => this.logger.info(this.object.default));
  }
}
