// Título, descrição e metatags de compartilhamento (Open Graph / Twitter),
// atualizados quando o idioma muda.
export const useSeo = () => {
  const { t, locale } = useI18n();
  const { siteUrl } = useRuntimeConfig().public;

  const title = computed(() => `${t("home.title")} - Nathan Henrick`);
  const description = computed(() => t("seo.description"));
  const image = siteUrl ? `${siteUrl}/og-image.png` : "/og-image.png";

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: "website",
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogLocale: computed(() => (locale.value === "en" ? "en_US" : "pt_BR")),
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
  });
};
