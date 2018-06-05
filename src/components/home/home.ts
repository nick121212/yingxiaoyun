import { Aside, Container, Header, Main } from 'element-ui';
import { Component, Vue } from 'vue-property-decorator';

import './home.scss';

@Component({
  template: require('./home.html'),
  components: {
    'el-aside': Aside,
    'el-header': Header,
    'el-main': Main,
    'el-container': Container
  }
})
export class HomeComponent extends Vue {

  public mode: string = process.env.ENV;
}
