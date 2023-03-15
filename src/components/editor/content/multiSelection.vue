<script setup lang="ts">
//inputRange
import { watch } from "vue";
import MdiLightDelete from "~icons/mdi-light/delete";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
let inputRanges = props.modelValue;
watch(props.modelValue, (v) => {
  inputRanges = v;
});
watch(inputRanges, (v) => {
  emit("update:modelValue", v);
});

function handlerRange(type: "add" | "del", ix: number = 1): void {
  switch (type) {
    case "add": {
      inputRanges.push({ first: "", last: "" });
      break;
    }
    case "del": {
      inputRanges.splice(ix, 1);
      break;
    }
  }
}
</script>

<template>
  <div v-for="(item, index) in inputRanges" class="flex items-center p-px">
    <InputRange
      v-model:first-name="item.first"
      v-model:last-name="item.last"
    ></InputRange>
    <MdiLightDelete
      v-if="inputRanges.length > 1"
      class="w-20"
      @click="handlerRange('del', index)"
    ></MdiLightDelete>
    <el-button
      v-if="index === inputRanges.length - 1"
      @click="handlerRange('add')"
      >添加</el-button
    >
  </div>
</template>

<style lang="scss" scoped></style>
