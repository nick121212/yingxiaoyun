import { Component, Vue } from 'vue-property-decorator';

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
export class ListComponent extends Vue {

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
    // const data = await this.proxy.executeAll({
    //   "batman": this.proxy.execute.bind(proxy,"tvmaze", "search.shows", {
    //     params: {
    //       q: "batman"
    //     }
    //   }), 
    //   "showgirl": this.proxy.execute.bind(proxy, "tvmaze", "search.shows", {
    //     params: {
    //       q: "showgirl"
    //     }
    //   })
    // });

    // console.log(data);
   
  }
}
