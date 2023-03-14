<script setup lang="ts">
import Node from "/@/components/editor/node/index.vue";
import Content from "/@/components/editor/content/index.vue";
import Quantifier from "/@/components/editor/quantifier/index.vue";
import TestRegex from "/@/components/test-regex/index.vue";
import { nodeType } from "/@/constants/nodeType";
import { ref, reactive, watch, toRaw } from "vue";
import MaterialSymbolsAdd from "~icons/material-symbols/add";
import MaterialSymbolsDeleteOutline from "~icons/material-symbols/delete-outline";
import Painer from "/@/views/painer/index.vue";

const contentValue = ref<Array<Object> | String>();
const nodeVal = ref<String | undefined>("");
watch(
  contentValue,
  (val) => {
    if (toRaw(val) instanceof Array) {
      //转化为字符串a-bc-d
      const result = (
        toRaw(val) as Array<{ first: string; last: string }>
      )?.reduce((res, item) => {
        return `${res}${item.first}-${item.last}`;
      }, "");
      nodeVal.value = result;
    } else {
      nodeVal.value = val as string;
    }
  },
  { deep: true }
);
const nodeTypes = ref(nodeType);

const rule = /[qwer]/;

const regexRows = reactive([{ rule, id: 0 }]);
function handleDel(index) {
  regexRows.splice(index, 1);
}
function handleAdd() {
  regexRows.push({ rule, id: regexRows.length });
}
const painerRef = ref<typeof Painer>();
const nodeRef = ref(null);
function opeOfNode(value) {
  switch (value) {
    case 1:
      painerRef.value?.insertOne();
      break;
    case 2:
      break;
    case 3:
      painerRef.value?.addOne();
      break;
  }
}
</script>

<template>
  <div class="flex p-3 w-[200px]">
    <div class="w-80 h-96">
      <el-tabs type="border-card">
        <el-tab-pane label="Role"></el-tab-pane>
        <el-tab-pane label="编辑">
          <span class="text-xl font-bold">插入节点</span>
          <div class="flex mt-2 w-60">
            <Node
              ref="nodeRef"
              :type-list="nodeTypes"
              class="h-20"
              @click-node="opeOfNode"
            >
            </Node>
          </div>
          <Content v-model="contentValue"></Content>
          <h1>量词</h1>
          <Quantifier> </Quantifier>
        </el-tab-pane>
        <el-tab-pane label="测试">
          <div
            class="flex items-center"
            v-for="(item, index) in regexRows"
            :key="item.id"
          >
            <TestRegex :rule-name="item.rule"></TestRegex>
            <MaterialSymbolsDeleteOutline
              class="ml-2"
              @click="handleDel(index)"
            ></MaterialSymbolsDeleteOutline>
          </div>
          <MaterialSymbolsAdd @click="handleAdd"></MaterialSymbolsAdd>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Painer ref="painerRef" class="ml-2" :node-value="nodeVal"></Painer>
  </div>
</template>

<style lang="scss" scoped></style>
