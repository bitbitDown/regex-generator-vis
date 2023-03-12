<script setup lang="ts">
type node = {
  value: number;
  tip: string;
  component: Function;
};
defineProps<{
  typeList: Array<node>;
}>();
</script>
<template>
  <div
    class="w-1/2 border-2 flex items-center justify-center cursor-pointer"
    v-for="v in typeList"
    :title="v.tip"
    @click="$emit('click-node', v.value)"
  >
    <component :is="v.component"></component>
  </div>
</template>

<style lang="scss" scoped></style>
