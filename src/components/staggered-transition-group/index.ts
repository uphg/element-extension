import { VueConstructor } from 'vue';
import StaggeredTransitionGroup from './StaggeredTransitionGroup'

// @ts-ignore
StaggeredTransitionGroup.install = function (Vue: VueConstructor) {
  Vue.component(StaggeredTransitionGroup.name, StaggeredTransitionGroup);
}

export {
  StaggeredTransitionGroup
}
