import { useState } from "react";

/**
 *
 * 时光穿梭机，前进后退，保留记录
 */
export const useUndo = <T>(initialPresent: T) => {
  const [past, setPast] = useState<T[]>([]);

  const [present, usePresent] = useState(initialPresent);

  const [future, setFuture] = useState<T[]>([]);
};
