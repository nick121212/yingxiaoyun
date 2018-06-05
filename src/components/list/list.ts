import { Button, Form, FormItem, Input, Pagination, Table, TableColumn } from "element-ui";
import { Component, Vue } from 'vue-property-decorator';
import { LoggerMixin } from './../../mixins/logger';

import { Mixins } from '../../mixins/base';
import { ProxyMixin } from '../../mixins/proxy';

interface UserResponse {
  id: string;
  name: string;
}

@Component({
  template: require('./list.html'),
  components: {
    "el-table": Table,
    "el-table-column": TableColumn,
    "el-input": Input,
    "el-button": Button,
    "el-form": Form,
    "el-form-item": FormItem,
    "el-pagination": Pagination
  }
})
export class ListComponent extends Mixins(ProxyMixin, LoggerMixin) {

  private items: any[] = [];
  private searchInfo: any = {
    searchText: "batman"
  };

  public mounted() {
    this.$nextTick(() => {
      this.loadItems();
    });

  }

  public async loadItems(q: string = this.searchInfo.searchText) {
    this.execute("tvmaze", "search.shows", {
      params: {
        q
      },
      settings: {
        timeout: 10000
      }
    }).then((data: any) => {
      this.items = data;
    }).catch(console.error);
  }
}
