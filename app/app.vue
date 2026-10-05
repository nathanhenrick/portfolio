<template>
  <Html :lang="head.htmlAttrs.lang">
    <Head>
      <template v-for="link in head.link" :key="link.key">
        <Link :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
      </template>
    </Head>
  </Html>

  <NuxtLayout>
    <Cursor />

    <Navbar />
    <NuxtPage />

    <div id="modal" tabindex="-1" aria-hidden="true"></div>

    <Footer />
  </NuxtLayout>
</template>

<script setup>
// lang do <html> e links hreflang/canonical de cada idioma.
// Os links precisam de URL absoluta, então só entram com NUXT_PUBLIC_SITE_URL definido.
const { siteUrl } = useRuntimeConfig().public;
const head = useLocaleHead({ seo: Boolean(siteUrl) });
</script>
