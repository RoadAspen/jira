import { useState, useEffect } from "react";
export const isFalsely = (value) => {
  return !value ? true : false;
};

// 负责清除 value为空的key
export const cleanObject = (object) => {
  const result = { ...object };

  Object.keys(result).forEach((key) => {
    const value = object[key];
    if (isFalsely(value)) {
      delete result[key];
    }
  });
  return result;
};

// 在页面刚加载的时候执行一个函数
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

// debounce
export const debounce = (func, delay) => {
  let timer = null;
  return (...params) => {
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
export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    console.log("准备定义timeeout");
    // 当value改变时，设置一个定时器，在一定时间之后修改 value
    let timeout = setTimeout(() => {
      console.log("更新");
      console.log(debounceValue === value);
      setDebounceValue({
        ...value,
      });
    }, delay);
    // 取消当前的timeout
    return () => {
      clearTimeout(timeout);
      timeout = null;
    };
  }, [value, delay]);
  return debounceValue;
};
