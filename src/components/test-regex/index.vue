<script setup lang="ts">
import { ref, watch, toRefs } from "vue";
import { isRegExp, isFunction } from "/@/utils/is";

const inputValue = ref("");
let valid = ref(false);
const props = defineProps({
  ruleName: Function || RegExp, //校验规则
});
const { ruleName } = toRefs(props);
watch(
  () => inputValue.value,
  (str) => {
    if (isRegExp(ruleName?.value)) {
      valid.value = ruleName?.value?.test(str) ?? false;
    } else if (isFunction(ruleName?.value)) {
      valid.value = ruleName?.value(str);
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
