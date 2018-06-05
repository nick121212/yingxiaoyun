import { Loading } from "element-ui";
import 'tachyons';
import Vue from 'vue';
import { LoggerMixin } from './mixins/logger';

import { ProxyMixin } from './mixins/proxy';
// import { getInterfaceConfig, proxy } from './modelproxy';
import { createRouter } from './router';
import { makeHot, reload } from './util/hot-reload';

import './sass/main.scss';

const navbarComponent = () => import('./components/navbar').then(({ NavbarComponent }) => NavbarComponent);

if (process.env.ENV === 'development' && module.hot) {
  const navbarModuleId = './components/navbar';

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
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
