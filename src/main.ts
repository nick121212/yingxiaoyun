import { Loading } from "element-ui";
import 'tachyons';
import Vue from 'vue';
import { LoggerMixin } from './mixins/logger';

import { ProxyMixin } from './mixins/proxy';
import { createRouter } from './router';
import { makeHot, reload } from './util/hot-reload';

// 获取组件
const navbarComponent = () => import('./components/navbar').then(({ NavbarComponent }) => NavbarComponent);

// 设置热加载功能
if (process.env.ENV === 'development' && module.hot) {
  const navbarModuleId = './components/navbar';

  makeHot(navbarModuleId, navbarComponent,
    module.hot.accept('./components/navbar', () => reload(navbarModuleId, (require('./components/navbar') as any).NavbarComponent)));
}

Vue.mixin(ProxyMixin);
Vue.mixin(LoggerMixin);
Vue.use(Loading);

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: '#app-main',
  router: createRouter(),
  components: {
    'navbar': navbarComponent
  }
});
