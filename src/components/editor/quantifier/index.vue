<script setup lang="ts">
import { ref } from "vue";
import InputRange from "/@/components/base/inputRange.vue";
interface SelectOptions {
  label: string;
  value: number;
}
const options: Array<SelectOptions> = [
  {
    label: "1（默认）",
    value: 0,
  },
  {
    label: "0 or 1",
    value: 1,
  },
  {
    label: "0 or more",
    value: 2,
  },
  {
    label: "1 or more",
    value: 3,
  },
  {
    label: "自定义",
    value: 4,
  },
];
//次数
const count = ref(0);
//是否贪婪
const isGreedy = ref(true);
//inputRange
const first = ref("");
const last = ref("");
</script>

<template>
  <el-select v-model="count" class="m-2" placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <div v-if="count !== 0">
    <div>greedy</div>
    <el-checkbox v-model="isGreedy">贪婪</el-checkbox>
  </div>
  <InputRange
    v-if="count === 4"
    v-model:first-name="first"
    v-model:last-name="last"
  ></InputRange>
</template>

<style lang="scss" scoped></style>
