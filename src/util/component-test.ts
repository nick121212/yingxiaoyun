import merge from 'lodash.merge';
import { SinonSpy } from 'sinon';
import Vue, { Component } from 'vue';
import { ILogger } from './log';

export interface IComponents {
  [key: string]: Component;
}

/**
 * 用于测试Component
 */
export class ComponentTest {

  public vm: Vue;

  constructor(private template: string, private components: IComponents) {
  }

  public createComponent(createOptions?: any): void {
    const options = {
      template: this.template,
      components: this.components
    };
    if (createOptions) {
      merge(options, createOptions);
    }
    this.vm = new Vue(options).$mount();
  }

  public async execute(callback: (vm: Vue) => Promise<void> | void): Promise<void> {
    await Vue.nextTick();
    await callback(this.vm);
  }
}
