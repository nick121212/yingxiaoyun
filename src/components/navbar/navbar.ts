import { Button } from "element-ui";
import { CreateElement } from "vue";
import { Component, Vue, Watch } from 'vue-property-decorator';

import { Mixins } from '../../mixins/base';
import { LoggerMixin } from '../../mixins/logger';
import { Logger } from '../../util/log';
import { Link } from './link';

import { XyComfirmActionButton } from "../actionbutton/confirm/index";

@Component({
  template: require('./navbar.html'),
  components: {
    [Button.name]: Button,
    [XyComfirmActionButton.cname]: XyComfirmActionButton
  }
})
export class NavbarComponent extends Mixins(LoggerMixin) {

  public object: { default: string } = { default: 'Default object property!' };
  public links: Link[] = [
    new Link('Home', '/'),
    new Link('About', '/about'),
    new Link('List', '/list')
  ];

  private btnGroupConfig = {
    tagName: "el-button",
    props: {
      loading: true
    },
    attrs: {
      type: "primary",
      class: "red"
    },
    children: "加载中"
  };
  // ns="tvmaze" keyinns="singlesearch.shows" id="showGirl"
  private proxyInfo = {
    ns: "tvmaze",
    key: "singlesearch.shows",
    params: {
      q: "batman"
    }
  };

  @Watch('$route.path')
  public pathChanged() {
    this.logger.info('Changed current path to: ' + this.$route.path);
  }

  public mounted() {
    this.$nextTick(() => this.logger.info(this.object.default));
  }

}
