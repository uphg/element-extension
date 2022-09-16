import StaggeredTransitionGroup from './StaggeredTransitionGroup'

StaggeredTransitionGroup.install = function (Vue) {
  Vue.component(StaggeredTransitionGroup.name, StaggeredTransitionGroup);
}

export { StaggeredTransitionGroup }
