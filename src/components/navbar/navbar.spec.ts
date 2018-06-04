import { expect } from 'chai';
import { assert, spy } from 'sinon';
import Vue from 'vue';
import Component from 'vue-class-component';
import VueRouter from 'vue-router';
import { ComponentTest } from '../../util/component-test';
import { MockLogger } from '../../util/mocklog';
import { NavbarComponent } from './navbar';

const loggerSpy = spy();

@Component({
  template: require('./navbar.html')
})
class MockNavbarComponent extends NavbarComponent {
  constructor() {
    super();
    this.logger = new MockLogger(loggerSpy);
  }
}

describe('Navbar component', () => {
  let directiveTest: ComponentTest;
  let router: VueRouter;

  before(() => {
    Vue.use(VueRouter);
    directiveTest = new ComponentTest('<div><navbar></navbar><router-view>loading...</router-view></div>', { 'navbar': MockNavbarComponent });

    const homeComponent = { template: '<div class="home">Home</div>' };
    const aboutComponent = { template: '<div class="about">About</div>' };
    const listComponent = { template: '<div class="list">List</div>' };

    router = new VueRouter({
      routes: [
        { path: '/', component: homeComponent },
        { path: '/about', component: aboutComponent },
        { path: '/list', component: listComponent }
      ]
    });
  });

  it('should render correct contents', async () => {
    directiveTest.createComponent({ router });

    await directiveTest.execute((vm) => { // ensure Vue has bootstrapped/run change detection
      assert.calledWith(loggerSpy, 'Default object property!');
      expect(vm.$el.querySelectorAll('.navbar-nav a').length).to.equal(3);
    });
  });

  describe('When clicking the about link', () => {
    beforeEach(async () => {
      directiveTest.createComponent({ router });

      await directiveTest.execute((vm) => {
        const anchor = vm.$el.querySelector('.navbar-nav a[href="#/about"]') as HTMLAnchorElement;
        anchor.click();
      });
    });

    it('should render correct about contents', async () => {
      await directiveTest.execute((vm) => {
        expect(vm.$el.querySelector('div.about').textContent).to.equal('About');
      });
    });
  });

  describe('When clicking the list link', () => {
    beforeEach(async () => {
      directiveTest.createComponent({ router });

      await directiveTest.execute((vm) => {
        const anchor = vm.$el.querySelector('.navbar-nav a[href="#/list"]') as HTMLAnchorElement;
        anchor.click();
      });
    });

    it('should render correct about contents', async () => {
      await directiveTest.execute((vm) => {
        expect(vm.$el.querySelector('div.list').textContent).to.equal('List');
      });
    });
  });

});
