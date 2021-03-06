import { useState, useEffect, useRef } from "react";
export const isFalsely = (value: unknown) => {
  return !value ? true : false;
};
export const isVoid = (value: unknown) => {
  return value === undefined || value === null || value === "";
};
// 负责清除 value为空的key
export const cleanObject = (object?: { [key: string]: unknown }) => {
  const result = { ...object };

  Object.keys(result).forEach((key) => {
    const value = object?.[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

// 在页面刚加载的时候执行一个函数
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// debounce
export const debounce = (func: (...params: any) => void, delay: number) => {
  let timer: any;
  return (...params: any) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      func(...params);
    }, delay);
  };
};

// useDebounce
export const useDebounce = <T>(value: T, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    // 当value改变时，设置一个定时器，在一定时间之后修改 value
    let timeout = setTimeout(() => {
      console.log("更新");
      console.log(debounceValue === value);
      setDebounceValue(value);
    }, delay);
    // 取消当前的timeout
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);
  return debounceValue;
};

// useArray
export const useArray = <T>(initicalValue: T[]) => {
  const [value, setValue] = useState(initicalValue);

  function add(v: T) {
    setValue((value) => ([] as T[]).concat(value, v));
  }
  function clear() {
    setValue([]);
  }
  function removeIndex(num: number) {
    const copy = [...value];
    copy.splice(num, 1);
    setValue([...copy]);
  }
  return { value: value, add: add, clear: clear, removeIndex };
};

// 修改 页面标题

export const useDocumenTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

// 判断组件是否卸载

export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
};
