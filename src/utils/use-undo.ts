import { useState } from "react";

/**
 *
 * 时光穿梭机，前进后退，保留记录
 */
export const useUndo = <T>(initialPresent: T) => {
  // 过去
  const [past, setPast] = useState<T[]>([]);

  // 现在
  const [present, setPresent] = useState(initialPresent);
  // 未来
  const [future, setFuture] = useState<T[]>([]);

  const canRedo = future.length !== 0;
  const canUndo = past.length !== 0;

  // 后退
  const undo = () => {
    if (past.length) {
      setPresent(past[past.length - 1]);
      setPast((past) => past.slice(0, past.length - 1));
      setFuture((future) => [present, ...future]);
    }
  };

  // 前进
  const redo = () => {
    if (future.length) {
      setPresent(future[future.length - 1]);
      setFuture((future) => future.slice(1));
      setPast((past) => [...past, present]);
    }
  };
  // 设置当前变量时，在过去中添加
  const setPresents = (newPresent: T) => {
    if (newPresent === present) return;
    setPresent((present) => {
      setPast((past) => [...past, present]);
      setFuture([]);
      return newPresent;
    });
  };
  // 重置
  const reset = () => {
    setPresent(initialPresent);
    setPast(() => []);
    setFuture(() => []);
  };

  return [
    { present },
    {
      undo,
      set: setPresents,
      redo,
      canRedo,
      canUndo,
      reset,
    },
  ];
};
