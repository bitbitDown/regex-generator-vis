<script setup lang="ts">
import { ref, watch, toRefs } from "vue";
import { isRegExp, isFunction } from "/@/utils/is";

const inputValue = ref("");
let valid = ref(false);
const props = defineProps({
  rule: Function || RegExp, //校验规则
});
const { rule } = toRefs(props);
watch(
  () => inputValue.value,
  (str) => {
    if (isRegExp(rule.value)) {
      valid.value = rule.value.test(str);
    } else if (isFunction(rule.value)) {
      valid.value = rule.value(str);
    }
  }
);
</script>

<template>
  <div class="flex justify-center items-center">
    <el-input v-model="inputValue"></el-input>
    <div
      class="h-4 w-4 rounded-full ml-2"
      :class="[valid ? 'bg-green-600' : 'bg-red-600']"
    ></div>
  </div>
</template>

<style lang="scss" scoped></style>
