import { Button, Dialog } from "element-ui";
import { IExecute } from "modelproxy/out/models/execute";
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

import { Mixins } from '../../../mixins/base';
import { ProxyMixin } from '../../../mixins/proxy';


@Component({
  template: require('./temp.html'),
  components: {
    [Button.name]: Button,
    [Dialog.name]: Dialog,
  }
})
export class XyComfirmActionButton extends Mixins(ProxyMixin) {
  public static cname: string = "xyc-confirm-btn";

  @Prop({
    default: "确认提示"
  })
  public title: string;

  @Prop({
    default: "确定吗？"
  })
  public content: string;

  @Prop({
    required: true
  })
  public proxyData: IExecute & { ns: string, key: string };

  private visible: boolean = false;

  public setDialogVisible(visible: boolean) {
    this.visible = visible;
  }

  public onSubmit() {
    const { ns, key, } = this.proxyData;

    this.execute(ns, key, this.proxyData).then((() => {
      this.setDialogVisible(false);
    })).catch(console.error);
  }
}

// ComfirmActionButtonComponent.name = "xyc-confirm-btn";
