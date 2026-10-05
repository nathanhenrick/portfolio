// URL pública do site (sem barra no final). Defina NUXT_PUBLIC_SITE_URL no deploy.
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || "";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/a11y",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxtjs/sitemap",
    "@nuxt/fonts",
    "@nuxtjs/color-mode",
  ],
  css: ["@/assets/css/global.css"],

  // Tema: escuro por padrão; a escolha do visitante fica salva no navegador.
  // Aplica a classe "dark" ou "light" no <html> (ver global.css).
  colorMode: {
    preference: "dark",
    fallback: "dark",
    classSuffix: "",
    storageKey: "portfolio-theme",
  },

  // Fonte baixada no build e servida pelo próprio site (sem bloquear a renderização)
  fonts: {
    families: [
      { name: "Tomorrow", provider: "google", weights: [300, 400, 500, 600, 700] },
    ],
  },

  // Imagens otimizadas podem ficar em cache no navegador por 30 dias
  routeRules: {
    "/_ipx/**": {
      headers: { "cache-control": "public, max-age=2592000, stale-while-revalidate=86400" },
    },
  },

  nitro: {
    compressPublicAssets: true,
  },

  runtimeConfig: {
    public: {
      siteUrl,
    },
  },

  site: {
    url: siteUrl,
    name: "Nathan Henrick",
  },

  i18n: {
    baseUrl: siteUrl,
    locales: [
      { code: "pt-br", language: "pt-BR", name: "Português", file: "pt-br.json" },
      { code: "en", language: "en-US", name: "English", file: "en.json" },
    ],
    defaultLocale: "pt-br",
    strategy: "prefix_except_default",

    langDir: "locales",
  },
});
