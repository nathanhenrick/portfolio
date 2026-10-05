// Rola suavemente até uma seção sem alterar a URL (sem "#id").
export const useScrollTo = () => {
  const scrollTo = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return { scrollTo };
};
