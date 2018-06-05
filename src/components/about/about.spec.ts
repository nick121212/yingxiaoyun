import { expect } from 'chai';
import { assert, spy } from 'sinon';
import Component from 'vue-class-component';
import { ComponentTest } from '../../util/component-test';
import { MockLogger } from '../../util/mocklog';
import { AboutComponent } from './about';

const loggerSpy = spy();

@Component({
  template: require('./about.html')
})
class MockAboutComponent extends AboutComponent {
  constructor() {
    super();
  }
}

describe('About component', () => {
  let directiveTest: ComponentTest;

  beforeEach(() => {
    directiveTest = new ComponentTest('<div><about></about></div>', { 'about': MockAboutComponent });
  });

  it('should render correct contents', async () => {
    directiveTest.createComponent();

    await directiveTest.execute((vm) => {
      expect(vm.$el.querySelector('.repo-link').getAttribute('href')).to.equal('https://github.com/ducksoupdev/vue-webpack-typescript');
      assert.calledWith(loggerSpy, 'about is ready!');
    });
  });
});
