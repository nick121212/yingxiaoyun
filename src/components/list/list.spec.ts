import { expect } from 'chai';
import Component from 'vue-class-component';
import { ComponentTest } from '../../util/component-test';
import { MockLogger } from '../../util/mocklog';
import { ListComponent } from './list';

@Component({
  template: require('./list.html')
})
class MockListComponent extends ListComponent {
  constructor() {
    super();
  }
}

describe('List component', () => {
  let directiveTest: ComponentTest;

  beforeEach(() => {
    directiveTest = new ComponentTest('<div><list></list></div>', { 'list': MockListComponent });
  });

  it('should render correct contents', async () => {
    directiveTest.createComponent();

    await directiveTest.execute((vm) => { // ensure Vue has bootstrapped/run change detection
      console.log(vm.$el.querySelectorAll('.content ul li'));
      expect(vm.$el.querySelectorAll('.content ul li').length).to.equal(3);
    });
  });
});
