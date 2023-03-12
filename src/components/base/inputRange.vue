<script setup lang="ts">
import { ref, computed } from "vue";
import { OnClickOutside } from "@vueuse/components";

defineProps({
  firstName: String,
  lastName: String,
});

defineEmits(["update:firstName", "update:lastName"]);
const isActive = ref(false);
const classObject = computed(() => ({
  "border-blue-300": isActive.value,
}));

function closeModal() {
  isActive.value = false;
}
</script>

<template>
  <OnClickOutside
    @trigger="closeModal"
    class="border-2 p-2 rounded flex items-center justify-center"
    @click="isActive = true"
    :class="classObject"
  >
    <input
      type="text"
      class="w-full border-none focus:outline-none text-center"
      :value="firstName"
      @input="$emit('update:firstName', $event.target.value)"
    />
    -
    <input
      type="text"
      class="w-full border-none focus:outline-none text-center"
      :value="lastName"
      @input="$emit('update:lastName', $event.target.value)"
    />
  </OnClickOutside>
</template>

<style lang="scss" scoped></style>
