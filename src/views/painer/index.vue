<script setup lang="ts">
import { ref, watch, computed, reactive } from "vue";
import MaterialSymbolsAdd from "~icons/material-symbols/add";
const input = ref("");
const elinput = ref(null);
const rectWidth = computed(() => {
  return (index) => {
    return options[index].width;
  };
});
const paddingX = computed(() => {
  return (index) => {
    return options[index].text.length * 5 + 30;
  };
});

const options = reactive([{ text: "", fill: "white", width: 100 }]);
const currentSelectRect = computed(() => {
  return options.findIndex((v) => v.fill === "#0070f3");
});
function insertOne() {
  if (currentSelectRect.value === 0) {
    options.unshift({
      text: "",
      fill: "white",
      width: 100,
    });
  } else {
    options.splice(currentSelectRect.value, 0, {
      text: "",
      fill: "white",
      width: 100,
    });
  }
}
function addOne() {
  options.splice(currentSelectRect.value + 1, 0, {
    text: "",
    fill: "white",
    width: 100,
  });
}

//监听input框，当前所选的rect值与input框绑定
watch(input, (value) => {
  /* ... */
  const obj = options.find((v) => v.fill === "#0070f3");
  if (obj) {
    obj.text = value;
    if (currentSelectRect.value === 0) {
      obj.width = value.length * 10 + 30;
    } else {
      obj.width = value.length <= 10 ? 100 : value.length * 10 + 30 - 0;
    }
  }
});
function clickRect(item) {
  if (item.fill !== "#0070f3") {
    options.forEach((v) => {
      v.fill = "white";
    });
    item.fill = "#0070f3";
  }
}

//path
const pathD = computed(() => {
  return `M 10,65 L30,65`;
});
//平移
const translateX = computed(() => {
  return (end) => {
    let i = 0;
    let res = 0;

    if (end === 0) {
      return `translate(0,0)`;
    } else {
      while (i < end) {
        res += options[i].width + 20;
        i++;
      }
      return `translate(${res},0)`;
    }
  };
});
//rect
const rectProperty = computed(() => {
  return {
    x: 30,
    y: 45.5,
  };
});

defineExpose({ insertOne, addOne });
</script>

<template>
  <div>
    <el-input v-model="input" ref="elinput"></el-input>
    <svg
      baseProfile="full"
      width="2000"
      height="200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0"
        y="59.5"
        width="10"
        height="10"
        rx="10"
        ry="10"
        class="stroke transparent-fill"
      ></rect>

      <g v-for="(item, index) in options" :transform="translateX(index)">
        <path :d="pathD" style="stroke: #660000; fill: none" />
        <g @click="clickRect(item)">
          <rect
            :x="rectProperty.x"
            :y="rectProperty.y"
            :width="rectWidth(index)"
            height="40"
            style="border: 2px solid"
            stroke="rgb(68, 68, 68)"
            :fill="item.fill"
            class="opacity-20"
          />

          <text
            :x="paddingX(index)"
            y="65.5"
            text-anchor="middle"
            font-size="12"
            fill="black"
          >
            {{ item.text }}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<style lang="scss" scoped></style>
