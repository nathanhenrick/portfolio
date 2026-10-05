<template>
  <footer>
    <div
      class="container flex flex-col sm:flex-row items-center justify-between gap-4 mx-auto px-4 text-center text-[var(--fg)] py-4 mt-10 select-none"
    >
      <article class="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
        <NuxtImg
          src="/logo.svg"
          alt="Logo"
          width="40"
          height="40"
          class="pointer-events-none"
        />
        <span>
          &copy; {{ new Date().getFullYear() }} {{ profile.name }}.
          {{ $t("footer.rights") }}
        </span>
      </article>

      <section class="flex gap-4">
        <a :href="profile.github" target="_blank" rel="noopener" aria-label="GitHub">
          <TechIcon color="primary" size="32" name="simple-icons:github" />
        </a>
        <a :href="profile.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn">
          <TechIcon color="primary" size="32" name="simple-icons:linkedin" />
        </a>
      </section>
    </div>
  </footer>
</template>

<script setup>
import { profile } from "~/data/profile";
</script>

<style scoped>
/* Ícones roxos ficam claros no hover: o cursor inverte as cores e o roxo
   invertido ficaria verde */
a :deep(.iconify) {
  transition: background-color 0.3s ease;
}

a:hover :deep(.iconify) {
  background-color: var(--fg) !important;
}
</style>
