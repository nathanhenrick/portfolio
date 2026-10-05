<template>
  <div
    class="relative group flex justify-center transition-transform duration-200 hover:scale-125"
  >
    <Icon
      :name="name"
      :size="size"
      :style="{ backgroundColor: `var(--${color})` }"
      class="iconify"
    />

    <span v-if="label" class="tooltip">
      {{ label }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
  size: {
    type: [Number, String],
    default: 42,
  },
  // Nome de uma variável de cor do CSS (ex.: "fg", "primary", "white")
  color: {
    type: String,
    default: "fg",
  },
});
</script>

<style lang="postcss">
.tooltip {
  @apply pointer-events-none
         absolute -top-8 left-1/2 -translate-x-1/2
         bg-[var(--primary)] text-[var(--white)] font-mono font-semibold text-xs px-2 py-1
         opacity-0 group-hover:opacity-100
         transition-opacity duration-200 whitespace-nowrap;
}
</style>
