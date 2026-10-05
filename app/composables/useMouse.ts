import { onMounted, onUnmounted } from "vue";

export function useMouse() {
  const mouse = useState("mouse", () => ({
    x: 0,
    y: 0,
  }));

  const update = (e: MouseEvent) => {
    mouse.value.x = e.clientX;
    mouse.value.y = e.clientY;
  };

  onMounted(() => {
    window.addEventListener("mousemove", update);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", update);
  });

  return mouse;
}
