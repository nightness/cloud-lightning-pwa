import { useState, useEffect } from "react";

function useKeyboard(OnPressHandler: (keys: Set<string>) => void) {
  const [pressedKeys, setPressedKeys] = useState<Set<any>>(new Set());

  useEffect(() => {
    if (pressedKeys.size === 0) return;
    OnPressHandler(pressedKeys);
  }, [pressedKeys]);

  useEffect(() => {
    function handleKeyDown(event: any) {
      setPressedKeys((keys) => new Set(keys).add(event.code));
    }

    function handleKeyUp(event: any) {
      // if (pressedKeys.size === 0) return;
      setPressedKeys((keys) => {
        const newKeys = new Set(keys);
        newKeys.delete(event.code);
        return newKeys;
      });
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return pressedKeys;
}

export default useKeyboard;
