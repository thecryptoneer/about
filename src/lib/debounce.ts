export const debounce = (func: any, wait: number, immediate?: boolean) => {
  let timeout: any;

  return (...args: any) => {
    // @ts-ignore
    const context: any = this;

    let later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    let callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};
