import { Component, Vue } from 'vue-property-decorator';

interface UserResponse {
  id: string;
  name: string;
}

@Component({
  template: require('./list.html'),
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

  private loadItems() {
    if (!this.items.length) {
      console.log(this.items);
    }
  }
}
