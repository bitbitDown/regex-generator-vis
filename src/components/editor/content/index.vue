<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import InputRange from "/@/components/base/inputRange.vue";
import MdiLightDelete from "~icons/mdi-light/delete";

interface SelectOptions {
  label: string;
  value: number;
}
const contentOptions: Array<SelectOptions> = reactive([
  {
    value: 0,
    label: "简单字符串",
  },
  {
    value: 1,
    label: "字符类",
  },
  {
    value: 2,
    label: "字符范围",
  },
  {
    value: 3,
    label: "单词边界断言",
  },
]);
const select = ref(2);

const showInputRange = computed(() => {
  return (val) => {
    return select.value === val;
  };
});
//简单字符串
const simpleString = ref("");
//字符类
const stringType = ref("");
const stringTypeOptions = reactive([
  {
    label: "任意字符",
    value: `.`,
  },
  {
    label: "任意数字",
    value: `\d`,
  },
  {
    label: "任意非数字",
    value: `\D`,
  },
  {
    label: "任意基本拉丁字母数字",
    value: `\w`,
  },
  {
    label: "任意非基本拉丁字母数字",
    value: `\W`,
  },
  {
    label: "任意空白字符",
    value: `\s`,
  },
  {
    label: "任意非空白字符",
    value: `\S`,
  },
  {
    label: "制表符",
    value: `\\t`,
  },
  {
    label: "回车符",
    value: `\\r`,
  },
  {
    label: "换行符",
    value: `\\n`,
  },
  {
    label: "垂直制表符",
    value: `\\v`,
  },
  {
    label: "Form-feed",
    value: `\\f`,
  },
  {
    label: "退格",
    value: `\\b`,
  },
  {
    label: "NULe",
    value: `\\0`,
  },
]);
//inputRange

const inputRanges = reactive([{ first: "", last: "" }]);

function handlerRange(type: "add" | "del", ix: number = 1): void {
  switch (type) {
    case "add": {
      inputRanges.push({ first: "", last: "" });
      console.log(inputRanges);
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
  <el-select v-model="select" class="m-2" placeholder="Select">
    <el-option
      v-for="item in contentOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <div v-if="showInputRange(0)">
    <h2>值</h2>
    <div class="p-2 border-solid rounded-xl">Note:输入将会被自动转义</div>
    <el-input v-model="simpleString"></el-input>
  </div>
  <div v-if="showInputRange(1)">
    <h2>类</h2>
    <el-select v-model="stringType" placeholder="Select">
      <el-option
        v-for="item in stringTypeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; font-size: 13px">{{ item.value }}</span>
      </el-option>
    </el-select>
  </div>
  <div
    v-for="(item, index) in inputRanges"
    class="flex items-center p-px"
    v-if="showInputRange(2)"
  >
    <InputRange
      v-model:first-name="item.first"
      v-model:last-name="item.last"
    ></InputRange>
    <MdiLightDelete
      v-if="inputRanges.length > 1"
      class="w-20"
      @click="handlerRange('del', index)"
    ></MdiLightDelete>
    <el-button @click="handlerRange('add')">添加</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
