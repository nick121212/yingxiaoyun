import Vue from 'vue';
import VueRouter, { Location, Route, RouteConfig } from 'vue-router';
import { makeHot, reload } from './util/hot-reload';

const homeComponent = () => import('./components/home').then(({ HomeComponent }) => HomeComponent);
const aboutComponent = () => import('./components/about').then(({ AboutComponent }) => AboutComponent);
const listComponent = () => import('./components/list').then(({ ListComponent }) => ListComponent);

// 设置热加载功能
if (process.env.ENV === 'development' && module.hot) {
  const homeModuleId = './components/home';
  const aboutModuleId = './components/about';
  const listModuleId = './components/list';

  makeHot(homeModuleId, homeComponent,
    module.hot.accept('./components/home', () => reload(homeModuleId, (require('./components/home') as any).HomeComponent)));

  makeHot(aboutModuleId, aboutComponent,
    module.hot.accept('./components/about', () => reload(aboutModuleId, (require('./components/about') as any).AboutComponent)));

  makeHot(listModuleId, listComponent,
    module.hot.accept('./components/list', () => reload(listModuleId, (require('./components/list') as any).ListComponent)));
}

Vue.use(VueRouter);

// 路由
export const createRoutes: () => RouteConfig[] = () => [{
  path: '/',
  component: homeComponent
}, {
  path: '/about',
  component: aboutComponent
}, {
  path: '/list',
  component: listComponent
}];

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() });
