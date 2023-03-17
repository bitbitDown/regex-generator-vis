<script setup lang="ts">
import Editor from "/@/views/editor/index.vue";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark({
  selector: "html",
  attribute: "class",
  valueDark: "dark",
  valueLight: "light",
});
const toggleDark = useToggle(isDark);
</script>

<template>
  <el-button @click="toggleDark()">点我</el-button>
  <Editor class="w-96 h-96"></Editor>
</template>

<style scoped></style>
