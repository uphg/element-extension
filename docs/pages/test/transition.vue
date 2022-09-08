<template>
  <div id="staggered-list-demo">
    <input v-model="query" />
    <e-staggered-transition-group tag="ul" class="staggered-list-ul">
      <li
        v-for="(item, index) in computedList"
        :key="item.msg"
        :data-index="index"
        class="staggered-list-li"
      >{{ item.msg }}</li>
    </e-staggered-transition-group>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

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
</script>

<style lang="scss">
@import 'src/styles/staggered-transition-group.css';
.staggered-list-ul {
  border: 1px solid blue;
  background-color: #ebeef5;
}
.staggered-list-li {
  margin-top: 3.2em;
  background-color: #3f85ed;
}
</style>