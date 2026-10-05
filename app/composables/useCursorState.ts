export const useCursorState = () => {
  const state = useState("cursorState", () => "default");

  type CursorType = 'default' | 'link';

  const setState = (value: CursorType) => {
    state.value = value;
  };

  return { state, setState };
};
