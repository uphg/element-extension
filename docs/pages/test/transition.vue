<template>
  <div id="staggered-list-demo">
    <input v-model="query">
    <transition-group
      name="staggered-fade"
      tag="ul"
      class="staggered-list-ul"
      v-bind:css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <li
        v-for="(item, index) in computedList"
        v-bind:key="item.msg"
        v-bind:data-index="index"
        class="staggered-list-item"
      >{{ item.msg }}</li>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
import { addClass, removeClass, getStyle } from 'src/utils/dom'

const transitionClass = 'staggered-fade'
const interval = 150

const query = ref('')
const list = ref([
  { msg: 'Bruce Lee' },
  { msg: 'Jackie Chan' },
  { msg: 'Chuck Norris' },
  { msg: 'Jet Li' },
  { msg: 'Kung Fury' }
])

const computedList = computed(() => list.value.filter(function (item) {
  return item.msg.toLowerCase().indexOf(query.value.toLowerCase()) !== -1
}))

function beforeEnter(el: HTMLElement) {
  el.style.opacity = `${0}`
  el.style.height = `${0}`
}

function enter(el: HTMLElement, done) {
  // var delay = el.dataset.index * 150
  var delay = Number(el.getAttribute('data-index')) * interval
  setTimeout(() => {
    el.style.opacity = `${1}`
    el.style.height = `${el.scrollHeight}px`
    done()
  }, delay)
}

function afterEnter(el: HTMLElement) {
}

function beforeLeave(el: HTMLElement) {
  el.style.opacity = `${1}`
  // el.style.height = '1.6em'
  el.style.height = `${el.scrollHeight}px`
}

function leave(el: HTMLElement, done) {
  // var delay = el.dataset.index * 150
  var delay = Number(el.getAttribute('data-index')) * interval
  setTimeout(() => {
    // void el.scrollHeight
    el.style.opacity = `${0}`
    el.style.height = `${0}`
    setTimeout(() => {
      done()
    }, 1000)
  }, delay)
}
</script>

<style lang="scss">
.staggered-fade {
  transition: height 0.8s, opacity 0.8s;
}

.staggered-list-ul {
  border: 1px solid blue;
}

.staggered-list-item {
  // transition: all 1s;
}
</style>