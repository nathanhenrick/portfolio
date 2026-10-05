<template>
  <h2
    class="sec-title text-4xl sm:text-6xl lg:text-7xl text-center uppercase font-bold break-words"
  >
    <slot></slot>
  </h2>
</template>

<style scoped>
.sec-title {
  text-shadow: -4px 4px 0 var(--primary);
  letter-spacing: 2px;
}

/* Tema claro: letra branca com contorno roxo, junto da sombra roxa */
:global(html.light .sec-title) {
  color: var(--white);
  -webkit-text-stroke: 3px var(--primary);
  paint-order: stroke fill;
}
</style>
