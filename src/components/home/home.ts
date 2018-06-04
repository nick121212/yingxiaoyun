import { Component, Vue } from 'vue-property-decorator';

import './home.scss';

@Component({
  template: require('./home.html'),
  components: {
  }
})
export class HomeComponent extends Vue {

  public package: string = 'vue-webpack-typescript';
  public repo: string = 'https://github.com/ducksoupdev/vue-webpack-typescript';
  public mode: string = process.env.ENV;
}
