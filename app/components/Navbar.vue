<template>
  <header class="container fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 px-4">
    <div class="flex md:grid md:grid-cols-[auto_1fr_auto] items-center justify-between gap-4">
      <a href="#home" class="logo flex justify-start" @click.prevent="go('home')">
        <NuxtImg
          src="logo.svg"
          alt="Logo Nathan"
          width="50"
          height="50"
          class="select-none pointer-events-none"
        />
      </a>

      <nav class="hidden md:flex justify-center">
        <ul class="flex gap-6 lg:gap-8 py-4 px-8 lg:px-10 nav-menu uppercase backdrop-blur-lg">
          <li v-for="item in items" :key="item.id">
            <a :href="`#${item.id}`" class="nav-link" @click.prevent="go(item.id)">
              {{ $t(item.label) }}
            </a>
          </li>
        </ul>
      </nav>

      <article class="flex justify-end gap-2 md:gap-4">
        <button
          class="glass-btn px-3 py-2 flex items-center"
          :aria-label="isDark ? $t('nav.theme_light') : $t('nav.theme_dark')"
          :title="isDark ? $t('nav.theme_light') : $t('nav.theme_dark')"
          @click="toggleTheme"
        >
          <!-- O tema salvo só é conhecido no navegador: evita divergência no SSR -->
          <ClientOnly>
            <Icon :name="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" size="20" />
            <template #fallback>
              <span class="block w-5 h-5" />
            </template>
          </ClientOnly>
        </button>

        <button
          v-for="loc in locales"
          :key="loc.code"
          @click="setLocale(loc.code)"
          class="glass-btn px-3 md:px-4 py-2"
          :class="{ active: locale === loc.code }"
        >
          {{ loc.code.toUpperCase() }}
        </button>

        <button
          class="glass-btn md:hidden px-3 py-2 flex items-center"
          :aria-label="$t('nav.menu')"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <Icon :name="menuOpen ? 'mdi:close' : 'mdi:menu'" size="20" />
        </button>
      </article>
    </div>

    <Transition name="menu">
      <nav v-if="menuOpen" class="md:hidden mt-3">
        <ul class="flex flex-col py-2 nav-menu uppercase backdrop-blur-lg">
          <li v-for="item in items" :key="item.id">
            <a
              :href="`#${item.id}`"
              class="nav-link block px-6 py-3"
              @click.prevent="go(item.id)"
            >
              {{ $t(item.label) }}
            </a>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n();
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value !== "light");
const toggleTheme = () => {
  colorMode.preference = isDark.value ? "light" : "dark";
};
const { scrollTo } = useScrollTo();

const menuOpen = ref(false);

const items = [
  { id: "home", label: "nav.home" },
  { id: "about", label: "nav.about" },
  { id: "experience", label: "nav.experience" },
  { id: "projects", label: "nav.projects" },
  { id: "contact", label: "nav.contact" },
];

const go = (id) => {
  menuOpen.value = false;
  scrollTo(id);
};
</script>

<style scoped>
ul {
  background-color: rgba(var(--bg-rgb), 0.7);
  border: 1px solid var(--primary);
  margin-top: 0;
}

/* Efeito vidro: o conteúdo que rola por trás fica desfocado */
.glass-btn {
  color: var(--fg);
  border: 1px solid rgba(var(--fg-rgb), 0.8);
  background-color: rgba(var(--bg-rgb), 0.55);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.glass-btn.active {
  color: var(--white);
  background-color: rgba(var(--primary-rgb), 0.75);
  border-color: var(--secondary);
}

/*
 * O cursor inverte as cores (mix-blend-mode: difference) e roxo invertido
 * vira verde. Por isso, no hover, o que é roxo fica claro: a inversão
 * resulta em preto/cinza.
 */
.glass-btn:hover {
  background-color: rgba(var(--fg-rgb), 0.9);
  border-color: var(--fg);
  color: var(--bg);
}

.logo img {
  transition: filter 0.3s ease;
}

.logo:hover img {
  filter: grayscale(1) brightness(1.8);
}

.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
