# 广告助手

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# lint the Typescript
npm run lint

# run the tests
npm test

# run the tests on changes
npm run test:watch

# run the test suite and generate a coverage report
npm run coverage

# run the tests on Teamcity
npm run ci:teamcity

# run the tests on Jenkins
npm run ci:jenkins

# build for production with minification
npm run build

# clean the production build
npm run clean
```

## 约定

### 命名

- 页面前缀 xyp-
- 组件前缀 xy-
- 指令前缀 xyd-focus

### Mixin

- 全局注入的Mixin要用$$开头($$logger)
- 局部注入的Mixin要用__开头(__logger)
