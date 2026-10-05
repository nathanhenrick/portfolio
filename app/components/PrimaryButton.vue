<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="href && external ? '_blank' : undefined"
    :rel="href && external ? 'noopener' : undefined"
    class="px-6 py-2 bg-[var(--primary)] text-[var(--white)] hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-300 mt-10 uppercase inline-block"
  >
    <slot />
  </component>
</template>

<script setup>
defineProps({
  href: {
    type: String,
  },
  external: {
    type: Boolean,
    default: false,
  },
});
</script>
