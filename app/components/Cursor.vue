<template>
  <div ref="cursor" class="cursor"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useMouse } from "~/composables/useMouse";
import { useCursorState } from "~/composables/useCursorState";

const cursor = ref(null);

const mouse = useMouse();
const { state, setState } = useCursorState();

// Elementos clicáveis que ativam o cursor de link
const INTERACTIVE = "a, button";

const onMouseOver = (e) => {
  if (e.target.closest?.(INTERACTIVE)) setState("link");
};

const onMouseOut = (e) => {
  const from = e.target.closest?.(INTERACTIVE);
  if (from && !from.contains(e.relatedTarget)) setState("default");
};

// Aparência de cada estado, por tema; a cada frame a aparência atual se
// aproxima da do estado ativo, o que deixa a troca suave.
// O cursor inverte as cores (mix-blend-mode: difference), então no tema
// claro a bolinha usa o complemento do roxo para continuar roxa sobre o fundo.
const LOOKS = {
  dark: {
    default: { scale: 1, r: 86, g: 70, b: 229 },
    link: { scale: 2, r: 255, g: 255, b: 255 },
  },
  light: {
    default: { scale: 1, r: 161, g: 177, b: 18 },
    link: { scale: 2, r: 255, g: 255, b: 255 },
  },
};

const colorMode = useColorMode();
const look = { ...LOOKS.dark.default };
let frame = null;

onMounted(() => {
  // Em telas de toque o cursor fica escondido: não roda a animação
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  document.addEventListener("mouseover", onMouseOver);
  document.addEventListener("mouseout", onMouseOut);

  let pos = { x: 0, y: 0 };
  let prev = { x: 0, y: 0 };

  const loop = () => {
    pos.x += (mouse.value.x - pos.x) * 0.15;
    pos.y += (mouse.value.y - pos.y) * 0.15;

    const theme = LOOKS[colorMode.value] ?? LOOKS.dark;
    const target = theme[state.value] ?? theme.default;
    for (const key in look) look[key] += (target[key] - look[key]) * 0.2;

    const vx = pos.x - prev.x;
    const vy = pos.y - prev.y;

    const speed = Math.sqrt(vx * vx + vy * vy);
    const angle = Math.atan2(vy, vx) * (180 / Math.PI);
    const stretch = Math.min(speed * 0.3, 0.25);

    const el = cursor.value;
    el.style.transform =
      `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) ` +
      `rotate(${angle}deg) scale(${look.scale + stretch}, ${look.scale - stretch})`;
    el.style.backgroundColor = `rgb(${look.r}, ${look.g}, ${look.b})`;

    prev.x = pos.x;
    prev.y = pos.y;

    frame = requestAnimationFrame(loop);
  };

  loop();
});

onBeforeUnmount(() => {
  document.removeEventListener("mouseover", onMouseOver);
  document.removeEventListener("mouseout", onMouseOut);
  cancelAnimationFrame(frame);
});
</script>

<style>
/* Cursor personalizado só em dispositivos com mouse */
@media (hover: hover) and (pointer: fine) {
  * {
    cursor: none !important;
  }

  /* Modal aberto fica na camada de cima, acima da bolinha: dentro dele vale o cursor do sistema */
  dialog[open],
  dialog[open] *,
  dialog[open]::backdrop {
    cursor: auto !important;
  }

  dialog[open] :is(a, button, summary, label, [role="button"]) {
    cursor: pointer !important;
  }

  body:has(dialog[open]) .cursor {
    opacity: 0;
  }
}

@media not ((hover: hover) and (pointer: fine)) {
  .cursor {
    display: none !important;
  }
}

.cursor {
  width: 32px;
  height: 32px;
  background: #5646E5;
  border-radius: 50%;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9999;

  mix-blend-mode: difference;
}
</style>
