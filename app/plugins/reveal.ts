// Diretiva v-reveal: o elemento aparece suavemente ao entrar na tela e
// volta a se esconder ao sair, para animar de novo na próxima vez.
// Usa um único IntersectionObserver compartilhado e anima só opacity/transform
// (via CSS em global.css), então não roda nada durante o scroll.
// Uso: v-reveal ou v-reveal="150" (atraso em ms, para escalonar itens).
export default defineNuxtPlugin((nuxtApp) => {
  // Fração do elemento que precisa estar na tela para aparecer
  const SHOW_RATIO = 0.1;

  let observer: IntersectionObserver | null = null;

  const getObserver = () => {
    observer ??= new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= SHOW_RATIO) {
            entry.target.classList.add("is-visible");
          } else if (!entry.isIntersecting) {
            // Só esconde quando saiu por completo: evita piscar na borda da tela
            entry.target.classList.remove("is-visible");
          }
        }
      },
      { threshold: [0, SHOW_RATIO] },
    );
    return observer;
  };

  nuxtApp.vueApp.directive<HTMLElement, number | undefined>("reveal", {
    // No servidor não faz nada: o conteúdo já vem visível no HTML
    getSSRProps: () => ({}),

    mounted(el, { value }) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (value) el.style.setProperty("--reveal-delay", `${value}ms`);

      // Já está na tela ao carregar: começa visível (evita piscar)
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("is-visible");
      }

      el.classList.add("reveal");
      getObserver().observe(el);
    },

    unmounted(el) {
      observer?.unobserve(el);
    },
  });
});
