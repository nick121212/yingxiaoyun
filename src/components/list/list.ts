import { Component, Vue } from 'vue-property-decorator';
import { Mixins } from '../../mixins/base';
import { ProxyMixin } from '../../mixins/proxy';

// import {fetc}

interface UserResponse {
  id: string;
  name: string;
}

@Component({
  template: require('./list.html'),
  // mixins:[proxyMixin],
  components: {

  }
})
export class ListComponent extends Mixins(ProxyMixin) {

  private items: UserResponse[] = [];

  constructor() {
    super();
  }

  public mounted() {
    this.$nextTick(() => {
      this.loadItems();
    });
  }

  private async loadItems() {
    this.execute("tvmaze", "search.shows", {
      params: {
        q: "batman"
      }
    }).then(console.log).catch(console.error);

  }
}
