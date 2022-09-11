import StaggeredTransitionGroup from './StaggeredTransitionGroup'
import { ComponentPlugin } from '../../types/component-plugin';

(StaggeredTransitionGroup  as ComponentPlugin<typeof StaggeredTransitionGroup>).install = function (Vue) {
  Vue.component(StaggeredTransitionGroup.name, StaggeredTransitionGroup);
}

export { StaggeredTransitionGroup }
